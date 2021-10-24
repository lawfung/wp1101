function dummy_check(node) {
    function check() {
        let parent = node.parentNode.parentNode
        if (node.checked) {
            parent.children[1].style = "text-decoration: line-through; opacity: 0.5;"
        }
        else {
            parent.children[1].style = ""
        }
        refresh()
    }
    return check
}
function dummy_delete(node) {
    function delete_one_item() {
        let parent = node.parentNode
        parent.parentNode.removeChild(parent)
        refresh()
    }
    return delete_one_item
}

function create_checkbox(id) {
    let rt = document.createElement("div")
    rt.classList.add("todo-app__checkbox")
        let input_block = document.createElement("input")
        input_block.id = id
        input_block.type = "checkbox"
        input_block.onclick = dummy_check(input_block)

        let label_block = document.createElement("label")
        label_block.htmlFor = id
    rt.appendChild(input_block)
    rt.appendChild(label_block)
    return rt
}
function create_li(task, id) {
    let rt = document.createElement("li")
    rt.classList.add("todo-app__item")
        let checkbox = create_checkbox(id)

        let content = document.createElement("h1")
        content.classList.add("todo-app__item-detail")
        content.innerHTML = task

        let cross = document.createElement("img")
        cross.classList.add("todo-app__item-x")
        cross.src = "./img/x.png"
        cross.onclick = dummy_delete(cross)
    rt.appendChild(checkbox)
    rt.appendChild(content)
    rt.appendChild(cross)
    return rt
}
function create_list() {
    let rt = document.createElement("ul")
    rt.classList.add("todo-app__list")
    rt.id = "todo-list"
    return rt
}
function create_button(content) {
    let rt = document.createElement("button")
    rt.type = "button"
    rt.innerHTML = content
    return rt
}
let display_status = 0 // 0 : All, 1 : Active, 2 : Completed

function dummy_set_display_mode(id){
    function set_display_mode() {
        display_status = id
        refresh()
    }
    return set_display_mode
}

function kill_the_ninja() {
    let C = list_node.children
    for (let i = 0; i < C.length; i++){
        node = C[i]
        if(node.children[0].children[0].checked === true) {
            list_node.removeChild(node)
            i--;
        }
    }
    refresh()
}

function create_footer() {
    let rt = document.createElement("footer")
    rt.classList.add("todo-app__footer")
    rt.id = "todo-footer"
        let A = document.createElement("div")
        A.classList.add("todo-app__total")
        A.innerHTML = "? left"

        let B = document.createElement("ul")
        B.classList.add("todo-app__view-buttons")
        B.appendChild(create_button("All"))
        B.appendChild(create_button("Active"))
        B.appendChild(create_button("Completed"))
        B.children[0].onclick = dummy_set_display_mode(0)
        B.children[1].onclick = dummy_set_display_mode(1)
        B.children[2].onclick = dummy_set_display_mode(2)

        let C = document.createElement("div")
        C.classList.add("todo-app__clean")
        C.appendChild(create_button("Clear completed"))
        C.children[0].onclick = kill_the_ninja
    rt.appendChild(A)
    rt.appendChild(B)
    rt.appendChild(C)
    return rt
}

let main_node = document.getElementsByClassName('todo-app__main')[0]
let input_node = main_node.children[0]
let foot_node = create_footer()
document.getElementsByClassName('todo-app__root')[0].appendChild(foot_node)

let serial_number = 0
let list_node = create_list()
main_node.appendChild(list_node)


function add_new_task(){
    let task = input_node.value
    if(task === "") {
        return
    }
    input_node.value = ""
    let li = create_li(task, serial_number)
    serial_number += 1
    list_node.appendChild(li)
    refresh()
}

input_node.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        add_new_task()
    }
});



function refresh_item() {
    let C = list_node.children
    let alive = false
    for (let i = 0; i < C.length; i++){
        node = C[i]
        if( (display_status === 1 && node.children[0].children[0].checked === true )
        ||  (display_status === 2 && node.children[0].children[0].checked === false ) ){
            node.style.display = "none"
        }
        else{
            node.style.display = ""
            alive = true
        }
    }
    return alive
}

function completed_count() {
    let C = list_node.children
    let cnt = 0
    for (let i = 0; i < C.length; i++){
        node = C[i]
        if(node.children[0].children[0].checked === true) {
            cnt += 1
        }
    }
    return cnt
}

function refresh() {
    let some_alive = refresh_item()
    if(some_alive === true) {
        list_node.style.display = ""
    }
    else {
        list_node.style.display = "none"
    }
    if(list_node.children.length === 0) {
        foot_node.style.display = "none"
        return
    }
    foot_node.style.display = ""
    count2 = completed_count()
    left = list_node.children.length - count2
    foot_node.children[0].innerHTML = `${left} left`
    if(count2 === 0) {
        foot_node.children[2].style.visibility = "hidden"
    }
    else{
        foot_node.children[2].style.visibility = "visible"
    }
    foot_node.children[1].children[0].style.outline = "none"
    foot_node.children[1].children[1].style.outline = "none"
    foot_node.children[1].children[2].style.outline = "none"
    foot_node.children[1].children[display_status].style.outline = "solid"
}


refresh()

