// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// 유저가 delete버튼을 누르면 할일이 삭제된다.
// 1. check버튼을 누르면 할일이 끝나고 줄이 생긴다.
// 2. ture이면 끝난걸로 간주하고 밑줄 보여주기
// 3. flase이면 안끝난걸로 간주하고 그래로

// 진행중 완료 탭을 누르면 언더바가 이동한다.
// 완료탭은 완료 아이템만, 진행중 탭은 진행중인 아이템만 노출한다.
// 전체 탭을 누르면 전체 아이템을 노출한다.

let underLine = document.getElementById("under_line");
let taskInput = document.getElementById("task_input") // 입력 값을 가져온다.
let addButton = document.getElementById("add") // 버튼을 가져온다.
let tabs = document.querySelectorAll(".task_tabs div") // task_tabs클래스의 디브를 모두 가져온다.
let taskList = [] // 태스크를 담을 빈 배열을 만든다.
let mode = "all" // 먼저 all 을 할당해야 render 함수에서 캐치할 수 있다
let filterList = []

addButton.addEventListener("mousedown", function () {
    addTask();
    taskInput.value="";
}); // 버튼을 클릭하면 addTask함수를 실행한다.
taskInput.addEventListener("keyup", function (event) { // 해당 키코드를 치면 함수를 실행한다.
    if (event.keyCode === 13) {
        addTask(event); // 엔터치면 에드테스크 함수를 호출함
        taskInput.value="";  // 엔터치면 인풋창의 값을 삭제해줌
    }
});

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)}) // 이벤트는 모든 이벤트를 의미함
}

// 입력 값을 taskContent 변수에 담는다.
// taskContent를 taskList에 담는다.
// render 함수를 실행한다.
function addTask(){
    let value = taskInput.value
    if (!value) {
        console.log("값이 없습니다")
        return 
    }
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].taskContent == value){
            console.log("이미 값이 있습니다")
            return
        }
    }
    let task = {
        id : randomIdGenerate(), // item에는 id가 있어야 추후 핸들링할 수 있다.
        taskContent: value,
        isComplete: false
    }
    taskList.push(task)
    filter()
    
}


// resultHtml 을 미리 선언한다.
// for를 이용해 taskList 배멸 길이 만큼 반복하면서 taskList 요소들을 html에 넣는다.
function render(){
    let list = filterList
    
    let resultHtml = ''
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){

            // list[i].isComplete 가 true라면 완료가 된 항목이기 때문에 요소에 줄을 긋는다.
            resultHtml += `<div class="task" id="task_done">
            <div class='task_done'>${list[i].taskContent}</div>
            <div> 
                <button onclick="toggleComplete('${list[i].id}')">check</button> 
                <button onclick="deleteTask('${list[i].id}')">delete</button>
            </div>
            </div>`;

        }else{

        // onclick="toggleComplete()" -> html 이벤트는 여기서 바로 적용할 수 있다.
        // 함수 안에 '${}' 로 인자를 넣을 수 있다.
            resultHtml += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div> 
                <button onclick="toggleComplete('${list[i].id}')">check</button> 
                <button onclick="deleteTask('${list[i].id}')">delete</button>
            </div>
            </div>`;
        }
    }

    // html 태그 id을 가져와 innerHTML에 만들어둔 HTML문을 할당한다.
    document.getElementById("task_board").innerHTML = resultHtml;
}

// 인자로 받은 id로 배열 요소 중에 일치하는 id를 찾아 객체의 속성을 true로 변경한다.
function toggleComplete(id) {
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            // 굳이 if를 또 쓸 필요없이 !만으로 정반대의 값을 넣을 수 있다!!!
            taskList[i].isComplete = !taskList[i].isComplete; 
            break;
        }
    }
    filter();
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    filter(); // 값을 수정하면 html 도 업데이트 해주어야 한다.
}

function filter(event){
    // console.log(event.target) 이벤트 타겟은 이벤트된 타겟, 여기서는 div의 모든 값을 가져온다. ex :: <div id="ongoing">진행중</div>
    
    
    // 메뉴 슬라이드바 코드
    if (event) {
        mode = event.target.id
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + event.target.offsetHeight + "px";
    }
    
    // 메뉴별 이벤트 핸들링
    filterList = []
    if(mode == "all"){
        filterList = taskList
        render()
    }else if(mode == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 12); // 랜덤 id 생성 코드, 근데 절대 안겹칠까?
}
