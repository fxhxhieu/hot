# Từ Dẻo

Trang web cá nhân để học từ vựng tiếng Anh theo chủ đề và cấp độ A1 đến B2, có ôn tập lặp lại ngắt quãng (SM-2), nghe bình thường và nghe chậm, bài nghe chép câu và bài chọn hình.

Không cần cài đặt hay build. Toàn bộ là file tĩnh (HTML, CSS, JavaScript).

## Cấu trúc

```
index.html      Khung trang
css/style.css   Giao diện
js/words.js     Toàn bộ từ vựng (file bạn sẽ sửa khi thêm từ)
js/data.js      Đọc words.js thành danh sách chủ đề
js/app.js       Logic học và ôn tập
```

## Chạy thử trên máy

Mở file `index.html` bằng trình duyệt là dùng được. Giọng đọc và tiến độ vẫn hoạt động.

## Đưa lên GitHub Pages

1. Tạo một repo mới trên GitHub (gói miễn phí thường cần repo công khai để dùng Pages).
2. Tải toàn bộ thư mục này lên repo, giữ nguyên cấu trúc.
3. Vào **Settings > Pages**, ở mục **Build and deployment** chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, rồi **Save**.
4. Đợi một đến hai phút. Địa chỉ trang có dạng `https://TÊN-GITHUB.github.io/TÊN-REPO/`.

Mỗi lần bạn commit thay đổi, trang tự cập nhật.

## Tiến độ học được lưu ở đâu

Tiến độ (từ đã học, lịch ôn, chuỗi ngày, từ bạn tự thêm) lưu trong trình duyệt của bạn (localStorage), riêng cho từng thiết bị và từng trình duyệt. Mở lại link là học tiếp từ chỗ cũ. Không có tài khoản và không có máy chủ nào nhận dữ liệu của bạn.

Hệ quả cần biết:

- Điện thoại và máy tính có tiến độ riêng.
- Xóa dữ liệu duyệt web của trang này sẽ mất tiến độ.
- Đổi tên miền hoặc tên repo cũng được tính là một trang mới, tiến độ không đi theo.

### Sao lưu và chuyển máy

Vào **Cài đặt** trong trang:

- **Tải về tệp** (hoặc **Sao chép**) để lấy bản sao lưu.
- Ở thiết bị mới, chọn tệp (hoặc dán nội dung) vào ô **Khôi phục từ bản sao lưu**, rồi bấm **Khôi phục**. Bản sao lưu sẽ thay thế tiến độ hiện có trên thiết bị đó.

Nếu trước đó bạn học trên bản chạy ở claude.ai, hãy sao lưu ở đó, rồi khôi phục vào trang GitHub theo cách trên.

## Thêm từ

### Cách 1: ngay trong trang

Dùng nút **Thêm từ** hoặc **Nhập hàng loạt** (mỗi dòng `từ | nghĩa | câu ví dụ`). Từ vào chủ đề **Từ của tôi** và lưu cùng tiến độ, tức là chỉ có trên trình duyệt đó và nằm trong bản sao lưu.

### Cách 2: sửa file `js/words.js`

Từ thêm theo cách này có cho mọi thiết bị mở trang. Mở file, thêm một dòng vào đúng chủ đề:

```
từ | phiên âm | loại từ | nghĩa tiếng Việt | câu ví dụ | dịch câu ví dụ | emoji
```

Ví dụ:

```
umbrella | /ʌmˈbrelə/ | n | cái ô, dù | Take an umbrella with you. | Hãy mang theo ô. | ☂️
```

- Bốn cột đầu là bắt buộc. Phiên âm có thể để trống.
- Câu ví dụ nên chứa đúng từ đó thì bài điền chỗ trống mới dùng được.
- Emoji là tùy chọn và giúp bài chọn hình. Mỗi emoji nên chỉ dùng cho một từ.
- Thêm chủ đề mới bằng một dòng `## cấp độ | mã | tên tiếng Anh | tên tiếng Việt`, ví dụ `## A2 | a2-sea | At the Sea | Ở biển`, rồi các từ bên dưới.
- Dòng bắt đầu bằng một dấu `#` là ghi chú.

Lưu ý:

- Đừng đổi cách viết của một từ đã có. Tiến độ gắn với chính từ đó nên đổi chữ sẽ mất tiến độ của từ ấy. Thêm, sửa nghĩa hoặc sửa câu ví dụ thì không sao.
- Không dùng ký tự `|` trong nội dung, và không dùng dấu huyền ` hay `${`.
- Nếu một dòng sai định dạng, trang bỏ qua dòng đó và ghi cảnh báo trong Console của trình duyệt (F12).

## Phím tắt khi học

`Enter` tiếp tục hoặc kiểm tra, `1` đến `4` chọn đáp án hoặc chấm điểm, `Space` lật thẻ, `S` nghe bình thường, `D` nghe chậm.

## Giọng đọc

Giọng đọc dùng sẵn trong trình duyệt nên chất lượng phụ thuộc thiết bị. Nếu giọng chậm bị ngắt quãng, chỉnh tốc độ trong **Cài đặt**.
