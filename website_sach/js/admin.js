/* =====================================================
   STORAGE
===================================================== */
const getBooks = () => JSON.parse(localStorage.getItem("books")) || [];
const setBooks = d => localStorage.setItem("books", JSON.stringify(d));
const getCats  = () => JSON.parse(localStorage.getItem("categories")) || [];
const setCats  = d => localStorage.setItem("categories", JSON.stringify(d));

/* =====================================================
   STATS
===================================================== */
function renderStats() {
    const books = getBooks();
    const cats = getCats();
    const used = [...new Set(books.map(b => b.category).filter(Boolean))];

    totalBooks.innerText = books.length;
    totalCategories.innerText = used.length;
    totalSystemCategories.innerText = cats.length;

    byBooks.innerHTML = used.map(c => "• " + c).join("<br>") || "—";
    systemCats.innerHTML = cats.map(c => "• " + c).join("<br>") || "—";
}

/* =====================================================
   CATEGORY SYSTEM
===================================================== */
function renderCategorySystem() {
    const cats = getCats();

    categoryAdminSystem.innerHTML = cats.map((c, i) => `
        <span class="badge-category me-1 mb-2">
            ${c}
            <span onclick="deleteCategory(${i})">✖</span>
        </span>
    `).join("");

    category.innerHTML =
        `<option value="">-- Chọn thể loại --</option>` +
        cats.map(c => `<option>${c}</option>`).join("");

    filterCategory.innerHTML =
        `<option value="">-- Tất cả thể loại --</option>` +
        cats.map(c => `<option value="${c}">${c}</option>`).join("");
}

/* =====================================================
   TABLE + SEARCH + FILTER
===================================================== */
function renderTable() {
    const books = getBooks();
    const keyword = (searchInput.value || "").trim().toLowerCase();
    const selectedCat = filterCategory.value;

    bookTable.innerHTML = "";
    let stt = 0;

    books.forEach((b, index) => {
        const matchText =
            (b.title || "").toLowerCase().includes(keyword) ||
            (b.author || "").toLowerCase().includes(keyword);

        const matchCat = !selectedCat || b.category === selectedCat;

        if (matchText && matchCat) {
            stt++;
            bookTable.innerHTML += `
            <tr>
                <td>${stt}</td>
                <td>
                    <img src="${b.image || 'images/book1.jpg'}"
                         height="60"
                         onerror="this.src='images/book1.jpg'">
                </td>
                <td>${b.title || ""}</td>
                <td>${b.author || ""}</td>
                <td>${b.category || ""}</td>
                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editBook(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm"
                        onclick="deleteBook(${index})">Xóa</button>
                </td>
            </tr>`;
        }
    });

    renderStats();
}

/* =====================================================
   CATEGORY CRUD
===================================================== */
function addCategory() {
    const name = newCategory.value.trim();
    if (!name) return;

    const cats = getCats();
    if (cats.some(c => c.toLowerCase() === name.toLowerCase())) {
        alert("Thể loại đã tồn tại!");
        return;
    }

    cats.push(name);
    setCats(cats);
    newCategory.value = "";
    renderCategorySystem();
    renderTable();
}

function deleteCategory(i) {
    if (!confirm("Xóa thể loại này?\nSách thuộc thể loại này sẽ bị bỏ trống.")) return;

    const cats = getCats();
    const removed = cats[i];
    cats.splice(i, 1);
    setCats(cats);

    const books = getBooks();
    books.forEach(b => {
        if (b.category === removed) b.category = "";
    });
    setBooks(books);

    renderCategorySystem();
    renderTable();
}

/* =====================================================
   BOOK CRUD
===================================================== */
function saveBook() {
    const books = getBooks();

    const book = {
        title: title.value.trim(),
        author: author.value.trim(),
        category: category.value,
        image: imageURL.value.trim() || "images/book1.jpg"
    };

    if (!book.title || !book.author) {
        alert("Vui lòng nhập đủ tên sách & tác giả!");
        return;
    }

    if (editIndex.value === "") {
        books.push(book);
    } else {
        books[editIndex.value] = book;
    }

    setBooks(books);
    resetForm();
    renderTable();
}

function editBook(i) {
    const b = getBooks()[i];
    if (!b) return;

    title.value = b.title || "";
    author.value = b.author || "";
    category.value = b.category || "";
    imageURL.value = b.image || "";
    editIndex.value = i;
    previewImage();
}

function deleteBook(i) {
    if (!confirm("Bạn chắc chắn muốn xóa sách này?")) return;

    let books = getBooks();
    books = books.filter((_, index) => index !== i);
    setBooks(books);

    alert("✅ Đã xóa sách");
    renderTable();
}

function resetForm() {
    title.value = "";
    author.value = "";
    imageURL.value = "";
    editIndex.value = "";
    preview.style.display = "none";
}

/* =====================================================
   UI
===================================================== */
function previewImage() {
    if (!imageURL.value) {
        preview.style.display = "none";
        return;
    }
    preview.src = imageURL.value;
    preview.style.display = "block";
}

function toggleBox(id) {
    document.getElementById(id).classList.toggle("hidden");
}

function logout() {
    localStorage.removeItem("isAdmin");
    location.href = "index.html";
}

/* =====================================================
   EXPORT JSON
===================================================== */
function exportData() {
    const data = { books: getBooks(), categories: getCats() };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "book-data-export.json";
    a.click();
}

/* =====================================================
   EXPORT EXCEL (THEO SEARCH + FILTER)
===================================================== */
function exportExcel() {
    if (typeof XLSX === "undefined") {
        alert("❌ Thư viện XLSX chưa được load!");
        return;
    }

    const books = JSON.parse(localStorage.getItem("books")) || [];

    if (books.length === 0) {
        alert("❌ Không có dữ liệu sách để xuất!");
        return;
    }

    const excelData = books.map((b, i) => ({
        "STT": i + 1,
        "Tên sách": b.title || "",
        "Tác giả": b.author || "",
        "Thể loại": b.category || "",
        "Hình ảnh": b.image || ""
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách sách");

    XLSX.writeFile(wb, "Danh_Sach_Sach.xlsx");
}


/* =====================================================
   PENDING BADGE
===================================================== */
function updatePendingBadge() {
    const pending = JSON.parse(localStorage.getItem("pendingBooks")) || [];
    if (!pendingBadge) return;

    pendingBadge.style.display = pending.length ? "inline-block" : "none";
    pendingBadge.innerText = pending.length;
}
// ===== EXPOSE FUNCTION FOR HTML onclick =====
window.exportExcel = exportExcel;
window.exportData  = exportData;
window.logout      = logout;
window.toggleBox   = toggleBox;
window.renderTable = renderTable;
window.addCategory = addCategory;
window.saveBook    = saveBook;
window.resetForm  = resetForm;

updatePendingBadge();
setInterval(updatePendingBadge, 3000);

/* =====================================================
   INIT
===================================================== */
renderCategorySystem();
renderTable();
