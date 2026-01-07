/* =====================================================
   LOAD CATEGORY
   ===================================================== */
function getCats(){
    return JSON.parse(localStorage.getItem("categories")) || [];
}

(function(){
    const cats = getCats();
    const select = document.getElementById("category");
    cats.forEach(c=>{
        select.innerHTML += `<option value="${c}">${c}</option>`;
    });
})();

/* =====================================================
   IMAGE PREVIEW (BASE64)
   ===================================================== */
let imageBase64 = "";

function previewImage(event){
    const file = event.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        imageBase64 = e.target.result;
        preview.src = imageBase64;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
}

/* =====================================================
   SUBMIT BOOK
   ===================================================== */
function submitBook(){
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value;
    const sender = document.getElementById("sender").value.trim();

    if(!title || !author || !category || !sender){
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const pending = JSON.parse(
        localStorage.getItem("pendingBooks")
    ) || [];

    pending.push({
        title,
        author,
        category,
        image: imageBase64 || "images/book1.jpg",
        sender,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem(
        "pendingBooks",
        JSON.stringify(pending)
    );

    alert("✅ Đã gửi sách! Vui lòng chờ admin duyệt.");

    // reset
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";
    document.getElementById("sender").value = "";
    preview.style.display = "none";
    imageBase64 = "";
}
