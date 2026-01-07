const pendingTable = document.getElementById("pendingTable");
const totalPending = document.getElementById("totalPending");
/* ==============================
   STORAGE
================================ */
function getPendingBooks(){
    return JSON.parse(localStorage.getItem("pendingBooks")) || [];
}
function setPendingBooks(d){
    localStorage.setItem("pendingBooks", JSON.stringify(d));
}
function getBooks(){
    return JSON.parse(localStorage.getItem("books")) || [];
}
function setBooks(d){
    localStorage.setItem("books", JSON.stringify(d));
}

/* ==============================
   RENDER
================================ */
function renderPending(){
    const list = getPendingBooks();
    console.log("Danh sách sách lấy được:", list); // Kiểm tra xem có dữ liệu không

    if(!totalPending || !pendingTable) {
        console.error("LỖI: Không tìm thấy thẻ HTML totalPending hoặc pendingTable!");
        return;
    }

    totalPending.innerText = list.length;
    pendingTable.innerHTML = "";

    if(list.length === 0){
        pendingTable.innerHTML = `<tr><td colspan="6">Không có sách chờ duyệt</td></tr>`;
        return;
    }

    list.forEach((b, i) => {
        console.log("Dữ liệu ngày của sách:", b.date); // Kiểm tra giá trị date của từng cuốn
        
        const displayDate = b.date 
            ? new Date(Number(b.date)).toLocaleString('vi-VN') 
            : "Chưa có ngày";

        pendingTable.innerHTML += `
            <tr>
                <td><input type="checkbox" class="chk" data-index="${i}"></td>
                <td><img src="${b.image || 'images/book1.jpg'}" height="60"></td>
                <td>${b.title}</td>
                <td>${b.author}</td>
                <td>${b.category}</td>
                <td>${displayDate}</td> 
            </tr>`;
    });
}

/* ==============================
   CHECKBOX
================================ */
function toggleAll(el){
    document.querySelectorAll(".chk")
        .forEach(c => c.checked = el.checked);
}

function getSelectedIndexes(){
    return [...document.querySelectorAll(".chk:checked")]
        .map(c => Number(c.dataset.index));
}

/* ==============================
   APPROVE / REJECT
================================ */
function approveSelected(){
    const selected = getSelectedIndexes();
    if(selected.length === 0){
        alert("Chưa chọn sách nào!");
        return;
    }

    const pending = getPendingBooks();
    const books = getBooks();

    selected.sort((a,b)=>b-a).forEach(i=>{
        books.push(pending[i]);
        pending.splice(i,1);
    });

    setBooks(books);
    setPendingBooks(pending);

    alert("✅ Đã duyệt sách!");
    renderPending();
}

function rejectSelected(){
    const selected = getSelectedIndexes();
    if(selected.length === 0){
        alert("Chưa chọn sách nào!");
        return;
    }

    if(!confirm("Xóa các sách đã chọn?")) return;

    const pending = getPendingBooks();
    selected.sort((a,b)=>b-a).forEach(i=>pending.splice(i,1));
    setPendingBooks(pending);

    renderPending();
}

/* ==============================
   INIT
================================ */
renderPending();
