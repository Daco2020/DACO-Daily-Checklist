// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// 유저가 delete버튼을 누르면 할일이 삭제된다.
// 1. check버튼을 누르면 할일이 끝나고 줄이 생긴다.
// 2. ture이면 끝난걸로 간주하고 밑줄 보여주기
// 3. flase이면 안끝난걸로 간주하고 그래로

// 진행중 완료 탭을 누르면 언더바가 이동한다.
// 완료탭은 완료 아이템만, 진행중 탭은 진행중인 아이템만 노출한다.
// 전체 탭을 누르면 전체 아이템을 노출한다.


let taskInput = document.getElementById("task_input") // 입력 값을 가져온다.
let addButton = document.getElementById("add") // 버튼을 가져온다.
let taskList = [] // 태스크를 담을 빈 배열을 만든다.
addButton.addEventListener("click",addTask) // 버튼이 클릭당하면 addTask함수를 실행한다.



// 입력 값을 taskContent 변수에 담는다.
// taskContent를 taskList에 담는다.
// render 함수를 실행한다.
function addTask(){
    let task = {
        id : randomIdGenerate(), // item에는 id가 있어야 추후 핸들링할 수 있다.
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    render();
    
}


// resultHtml 을 미리 선언한다.
// for를 이용해 taskList 배멸 길이 만큼 반복하면서 taskList 요소들을 html에 넣는다.
function render(){
    console.log(taskList)
    let resultHtml = ''
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){

            // taskList[i].isComplete 가 true라면 완료가 된 항목이기 때문에 요소에 줄을 긋는다.
            resultHtml += `<div class="task" id="task_done">
            <div class='task_done'>${taskList[i].taskContent}</div>
            <div> 
                <button onclick="toggleComplete('${taskList[i].id}')">check</button> 
                <button onclick="deleteTask('${taskList[i].id}')">delete</button>
            </div>
            </div>`;

        }else{

        // onclick="toggleComplete()" -> html 이벤트는 여기서 바로 적용할 수 있다.
        // 함수 안에 '${}' 로 인자를 넣을 수 있다.
            resultHtml += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div> 
                <button onclick="toggleComplete('${taskList[i].id}')">check</button> 
                <button onclick="deleteTask('${taskList[i].id}')">delete</button>
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
    render();
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,i+1)
            break;
        }
    }
    render(); // 값을 수정하면 html 도 업데이트 해주어야 한다.
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 12); // 랜덤 id 생성 코드, 근데 절대 안겹칠까?
}