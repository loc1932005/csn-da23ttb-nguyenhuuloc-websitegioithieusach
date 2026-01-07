/* =====================================================
   DATA KHỞI TẠO BAN ĐẦU
   ===================================================== */

const initialBooks = [
    // Văn học Việt Nam
    { title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", image: "images/book2.jpg" },
    { title: "Mắt Biếc", author: "Nguyễn Nhật Ánh", category: "Văn học Việt Nam", image: "images/book3.jpg" },
    { title: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", category: "Văn học Việt Nam", image: "images/book4.jpg" },
    { title: "Số Đỏ", author: "Vũ Trọng Phụng", category: "Văn học Việt Nam", image: "images/book5.jpg" },
    { title: "Cánh Đồng Bất Tận", author: "Nguyễn Ngọc Tư", category: "Văn học Việt Nam", image: "images/book6.jpg" },

    // Kỹ năng sống
    { title: "Đắc Nhân Tâm", author: "Dale Carnegie", category: "Kỹ năng sống", image: "images/book7.jpg" },
    { title: "Quẳng Gánh Lo Đi Và Vui Sống", author: "Dale Carnegie", category: "Kỹ năng sống", image: "images/book8.jpg" },
    { title: "Hiểu Về Trái Tim", author: "Thích Minh Niệm", category: "Kỹ năng sống", image: "images/book9.jpg" },
    { title: "Đời Thay Đổi Khi Chúng Ta Thay Đổi", author: "Andrew Matthews", category: "Kỹ năng sống", image: "images/book10.jpg" },
    { title: "Sống Thăng Hoa", author: "James Allen", category: "Kỹ năng sống", image: "images/book11.jpg" },

    // Kinh tế - Kinh doanh
    { title: "Cha Giàu Cha Nghèo", author: "Robert Kiyosaki", category: "Kinh tế", image: "images/book12.jpg" },
    { title: "Nghĩ Giàu Và Làm Giàu", author: "Napoleon Hill", category: "Kinh tế", image: "images/book13.jpg" },
    { title: "Bí Mật Tư Duy Triệu Phú", author: "T. Harv Eker", category: "Kinh tế", image: "images/book14.jpg" },
    { title: "Kinh Tế Học Cơ Bản", author: "Paul Samuelson", category: "Kinh tế", image: "images/book15.jpg" },
    { title: "Quốc Gia Khởi Nghiệp", author: "Dan Senor", category: "Kinh tế", image: "images/book16.jpg" },

    // Khoa học
    { title: "Lược Sử Thời Gian", author: "Stephen Hawking", category: "Khoa học", image: "images/book17.jpg" },
    { title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", category: "Khoa học", image: "images/book18.jpg" },
    { title: "Vũ Trụ", author: "Carl Sagan", category: "Khoa học", image: "images/book19.jpg" },
    { title: "Nguồn Gốc Các Loài", author: "Charles Darwin", category: "Khoa học", image: "images/book20.jpg" },
    { title: "Thế Giới Phẳng", author: "Thomas L. Friedman", category: "Khoa học", image: "images/book21.jpg" },

    // Văn học nước ngoài
    { title: "Nhà Giả Kim", author: "Paulo Coelho", category: "Văn học nước ngoài", image: "images/book22.jpg" },
    { title: "Ông Già Và Biển Cả", author: "Ernest Hemingway", category: "Văn học nước ngoài", image: "images/book23.jpg" },
    { title: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry", category: "Văn học nước ngoài", image: "images/book24.jpg" },
    { title: "Bố Già", author: "Mario Puzo", category: "Văn học nước ngoài", image: "images/book25.jpg" },
    { title: "Tiếng Chim Hót Trong Bụi Mận Gai", author: "Colleen McCullough", category: "Văn học nước ngoài", image: "images/book26.jpg" },

    // Trinh thám - Kinh dị
    { title: "Sherlock Holmes", author: "Arthur Conan Doyle", category: "Trinh thám", image: "images/book27.jpg" },
    { title: "Sự Im Lặng Của Bầy Cừu", author: "Thomas Harris", category: "Trinh thám", image: "images/book28.jpg" },
    { title: "Án Mạng Trên Chuyến Tàu Tốc Hành Phương Đông", author: "Agatha Christie", category: "Trinh thám", image: "images/book29.jpg" },
    { title: "Biểu Tượng Thất Truyền", author: "Dan Brown", category: "Trinh thám", image: "images/book30.jpg" },
    { title: "Hỏa Ngục", author: "Dan Brown", category: "Trinh thám", image: "images/book31.jpg" }
];

const initialCategories = [
    "Văn học Việt Nam",
    "Văn học nước ngoài",
    "Kỹ năng sống",
    "Kinh tế",
    "Khoa học",
    "Trinh thám"
];

/* =====================================================
   KHỞI TẠO LOCALSTORAGE (CHẠY 1 LẦN DUY NHẤT)
   ===================================================== */

(function initData(){
    if (!localStorage.getItem("books")) {
        localStorage.setItem(
            "books",
            JSON.stringify(initialBooks)
        );
    }

    if (!localStorage.getItem("categories")) {
        localStorage.setItem(
            "categories",
            JSON.stringify(initialCategories)
        );
    }
})();
