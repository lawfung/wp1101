let cur_album;
let cur_img;
let pic = [
	"https://phycat.files.wordpress.com/2017/03/max_planck_1878.gif",
	"https://s1.52poke.wiki/wiki/thumb/b/b9/172Pichu.png/300px-172Pichu.png",
	"https://s1.52poke.wiki/wiki/thumb/e/e4/173Cleffa.png/300px-173Cleffa.png",
	"https://s1.52poke.wiki/wiki/thumb/6/6b/175Togepi.png/300px-175Togepi.png",
	"https://s1.52poke.wiki/wiki/thumb/5/5b/177Natu.png/300px-177Natu.png",
	"https://s1.52poke.wiki/wiki/thumb/f/f4/178Xatu.png/300px-178Xatu.png",
	"https://s1.52poke.wiki/wiki/thumb/6/6b/179Mareep.png/300px-179Mareep.png",
	"https://s1.52poke.wiki/wiki/thumb/6/6f/180Flaaffy.png/300px-180Flaaffy.png",
	"https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
]

function init_album(x, y){
	x.name = y
	return x
}

let album = [
	init_album([pic[0], pic[1], pic[2], pic[8]], "album : Ich habe keine Freude."),
	init_album([pic[3], pic[4], pic[5], pic[6], pic[7], pic[4], pic[5], pic[6], pic[7], pic[4], pic[5], pic[6], pic[7]], "album2"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3"),
	init_album([], "album3")
]

let small_block = document.getElementById("small-picture-block") 
let large_block = document.getElementById("big-picture-block")
let album_block = document.getElementById("album-select-block")

function get_total_count(){
	let total_count = 0
	for(let i = 0; i < album.length; i++) {
		total_count += album[i].length
	}
	return total_count
}

function refresh_total_count(){
	document.getElementById("global_cnt").innerHTML = `total img count : ${get_total_count()}`
}

function get_local_count(){
	if(cur_album < album.length){
		return album[cur_album].length
	}
	else{
		return "nope"
	}
}

function refresh_local_count(){
	document.getElementById("local_cnt").innerHTML 	= `img count : ${get_local_count()}`
}

function get_img_order() {
	if(get_local_count() === 0 || get_local_count() === "nope") {
		return "nope"
	}
	return cur_img + 1
}

function refresh_img_order() {
	document.getElementById("order_cnt").innerHTML = `current img order : ${get_img_order()}`
}

function refresh_all() {
	refresh_total_count()
	refresh_local_count()
	refresh_img_order()
}

function large_block_setting(){
	large_block.innerHTML = ""
	if(album.length === 0 || album[cur_album].length === 0){
		large_block.innerHTML 
			+= `<div> no image</div>\n`
	}
	else{
		large_block.innerHTML +=
			'<button type="button" \
			class="all-button" \
			onclick="delete_image()" \
			id="delete-image"> \
			delete this image</button>'
		large_block.innerHTML += 
			`<div> source : \
			${album[cur_album][cur_img]} \
			</div>`
		large_block.innerHTML += 
			`<img class="big-picture" \
			src="${album[cur_album][cur_img]}">\n`
	}
}

function delete_image(){
	if(confirm("Do you really want to delete this image?")){
		album[cur_album].splice(cur_img, 1)
		let gallery = document.getElementById("gallery")
		gallery.removeChild(gallery.children[cur_img])
		for(let i = 0; i < album[cur_album].length; i ++) {
			gallery.children[i].onclick = set_cur_img(i)
		}
		let new_cur_img = Math.max(Math.min(cur_img, album[cur_album].length - 1), 0)
		set_cur_img(new_cur_img)()
	}
}

function small_block_setting(){
	small_block.innerHTML = ""
	if(cur_album >= album.length){
		small_block.innerHTML += "please create an album first"
		large_block.innerHTML = ""
		return
	}
	small_block.innerHTML += 
		'<input type="url" \
		id="url-input" \
		placeholder="input the url of image">'
	small_block.innerHTML += 
		'<button type="button" \
		class="all-button" \
		onclick="add_image()"> \
		add image</button>'
	small_block.innerHTML += 
		`<div id="local_cnt">img count : nope</div>`
	small_block.innerHTML += 
		`<div id="order_cnt">current img order : nope</div>`
	small_block.innerHTML += 
		'<button type="button" \
		class="all-button" \
		onclick="delete_album()" \
		id="delete-album"> \
		delete this album</button>'
	let bb = document.createElement("div")
	bb.setAttribute("id", "gallery");
	for(let i = 0; i < album[cur_album].length; i++) {
		let node = document.createElement("img")
		node.classList.add("small-picture");
		node.setAttribute("src", `${album[cur_album][i]}`);
		node.onclick = set_cur_img(i)
		bb.appendChild(node)
	}
	small_block.appendChild(bb)
	set_cur_img(0)()
	if(album[cur_album].length == 0){
		alert(`This album(${album[cur_album].name}) is/becomes empty`);
	}
}

function set_cur_img(x){
	function dummy(){
		cur_img = x
		let gallery_child = document.getElementById("gallery").children
		for(let i = 0; i < gallery_child.length; i ++) {
			if(i == cur_img) {
				gallery_child[i].classList.add("small-clicked");
			}
			else{
				gallery_child[i].classList.remove("small-clicked");	
			}
		}
		refresh_all()
		large_block_setting()
	}
	return dummy
}

function add_image(){
	let img_link = document.getElementById("url-input").value
	if(img_link != ""){
		document.getElementById("url-input").value = ""

		album[cur_album].push(img_link)
		let gallery = document.getElementById("gallery")
			let node = document.createElement("img")
			node.classList.add("small-picture");
			node.setAttribute("src", img_link);
			let new_cur_img = album[cur_album].length - 1
			node.onclick = set_cur_img(new_cur_img)
			gallery.appendChild(node)
		set_cur_img(new_cur_img)()
	}
}

function delete_album(){
	if(confirm("Do you really want to delete this album?")){
		album.splice(cur_album, 1)

		let album_list = document.getElementById("album-list")
		album_list.removeChild(album_list.children[cur_album])
		for(let i = 0; i < album.length; i ++) {
			album_list.children[i].onclick = set_cur_album(i)
		}
		let new_cur_album = Math.max(Math.min(cur_album, album.length - 1), 0)
		set_cur_album(new_cur_album)()
	}
}

function album_block_setting(){
	album_block.innerHTML = "<div class='title'> album list </div>"
	album_block.innerHTML += 
		`<div id="global_cnt"> total img count : nope</div>`
	album_block.innerHTML += 
		'<input type="text" \
		id="album-input" \
		placeholder="input the name of album">'
	album_block.innerHTML += 
		'<button type="button" \
		class="all-button" \
		onclick="create_album()"> \
		create album</button>'
	album_block.innerHTML += 
		'<button type="button" \
		class="all-button" \
		onclick="delete_all_empty_album()"> \
		delete all empty albums</button>'

	let bb = document.createElement("div")
	bb.setAttribute("id", "album-list");
	for(let i = 0; i < album.length; i ++) {
		let node = document.createElement("div")
		node.classList.add("album-button");
		node.innerHTML = `${album[i].name}`
		node.onclick = set_cur_album(i)
		bb.appendChild(node)
	}
	album_block.appendChild(bb)
	set_cur_album(0)()
}

function set_cur_album(x){
	function dummy(){
		cur_album = x
		let album_child = document.getElementById("album-list").children
		for(let i = 0; i < album_child.length; i ++) {
			if(i == cur_album) {
				album_child[i].classList.add("album-clicked");
			}
			else{
				album_child[i].classList.remove("album-clicked");	
			}
		}
		refresh_total_count()
		small_block_setting()
	}
	return dummy
}

function delete_all_empty_album(){
	if(album.filter(e => e.length == 0).length == 0) {
		alert("There's no empty album")
		return
	}
	if(confirm("Do you really want to delete all empty albums?")){
		let keys = Array.from(album.keys())
		keys = keys.filter(e => album[e].length == 0)
		let album_list = document.getElementById("album-list")
		let candidate = keys.map(e => album_list.children[e])
		candidate.forEach(e => album_list.removeChild(e))

		album = album.filter(e => e.length > 0)
		for(let i = 0; i < album.length; i ++) {
			album_list.children[i].onclick = set_cur_album(i)
		}
		let new_cur_album = Math.max(Math.min(cur_album, album.length - 1), 0)
		set_cur_album(new_cur_album)()
	}
}

function create_album() {
	let input_block = document.getElementById("album-input")
	if(input_block.value != ""){
		let new_array = []
		new_array.name = input_block.value
		input_block.value = ""
		album.push(new_array)
		let album_list = document.getElementById("album-list")
			let node = document.createElement("div")
			node.classList.add("album-button");
			node.innerHTML = new_array.name
			let new_cur_album = album.length - 1
			node.onclick = set_cur_album(new_cur_album)
			album_list.appendChild(node)
		set_cur_album(new_cur_album)()
	}
}

album_block_setting()