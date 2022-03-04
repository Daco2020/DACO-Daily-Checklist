// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// 유저가 delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나고 줄이 생긴다.
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
    let taskContent = taskInput.value
    taskList.push(taskContent)
    render();
}


// resultHtml 을 미리 선언한다.
// for를 이용해 taskList 배멸 ㄱ
function render(){
    let resultHtml = ''
    for(let i=0;i<taskList.length;i++){
        resultHtml += `<div class="task">
            <div>${taskList[i]}</div>
            <div> 
                <button>check</button>
                <button>delete</button>
            </div>
        </div>`;
    }

    document.getElementById("task_board").innerHTML = resultHtml;

}
