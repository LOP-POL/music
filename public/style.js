const left = document.querySelector(".left-side")
const header = document.querySelector("header")
console.log(left)
const handleMove = e =>{
const p = e.clientX / window.innerWidth *100
left.style.width = `${p}%`;
console.log("done it")
}
header.onmousemove = e=>handleMove(e)
header.ontouchmove = e=> handleMove(e.touches[0])