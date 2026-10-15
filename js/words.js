// Từ Dẻo - dữ liệu từ vựng.
//
// CÁCH THÊM TỪ: mở file này, thêm một dòng vào đúng chủ đề rồi lưu lại.
// Mỗi dòng là một từ, các cột ngăn cách bằng dấu |
//
//   từ | phiên âm | loại từ | nghĩa tiếng Việt | câu ví dụ | dịch câu ví dụ | emoji
//
// - Bắt buộc có 4 cột đầu (từ, phiên âm, loại từ, nghĩa). Phiên âm có thể để trống.
// - Câu ví dụ nên chứa đúng từ đó để bài điền chỗ trống hoạt động.
// - Cột dịch câu ví dụ và emoji là tùy chọn. Emoji giúp bài chọn hình.
// - Dòng bắt đầu bằng ## là một chủ đề: ## cấp độ | mã chủ đề | tên tiếng Anh | tên tiếng Việt
//   Cấp độ là A1, A2, B1 hoặc B2. Mã chủ đề viết thường, không dấu, không trùng nhau.
// - Dòng bắt đầu bằng một dấu # là ghi chú, trang sẽ bỏ qua.
//
// LƯU Ý
// - Đừng đổi cách viết của từ đã có, vì tiến độ học của từ đó được gắn với chính từ.
// - Đừng dùng ký tự | trong nội dung, và đừng dùng dấu huyền ` hoặc ${ vì file này nằm trong một chuỗi JavaScript.
//
const WORDS_TEXT = `
## A1 | a1-basics | Greetings & Basics | Chào hỏi và từ cơ bản
hello | /həˈloʊ/ | exclam | xin chào | Hello, my name is Linh. | Xin chào, tên mình là Linh.
goodbye | /ɡʊdˈbaɪ/ | exclam | tạm biệt | Goodbye! See you tomorrow. | Tạm biệt! Hẹn gặp bạn ngày mai.
please | /pliːz/ | adv | làm ơn, xin vui lòng | Please sit down. | Xin mời ngồi.
thank you | /ˈθæŋk juː/ | phr | cảm ơn | Thank you for your help. | Cảm ơn bạn đã giúp đỡ.
sorry | /ˈsɑːri/ | adj | xin lỗi; lấy làm tiếc | Sorry, I forgot your book. | Xin lỗi, mình quên mang sách của bạn.
excuse me | /ɪkˈskjuːz miː/ | phr | xin lỗi (khi hỏi hoặc nhờ ai) | Excuse me, where is the bus stop? | Xin lỗi, trạm xe buýt ở đâu ạ?
yes | /jes/ | adv | vâng, có, đúng | Yes, I like coffee. | Vâng, tôi thích cà phê.
no | /noʊ/ | adv | không | No, thank you. | Không, cảm ơn.
name | /neɪm/ | n | tên | What is your name? | Bạn tên là gì?
friend | /frend/ | n | bạn bè | She is my best friend. | Cô ấy là bạn thân nhất của tôi.
welcome | /ˈwelkəm/ | exclam | chào mừng | Welcome to my house. | Chào mừng đến nhà tôi.
understand | /ˌʌndərˈstænd/ | v | hiểu | I understand the lesson. | Tôi hiểu bài học.
repeat | /rɪˈpiːt/ | v | lặp lại, nhắc lại | Please repeat the word. | Làm ơn nhắc lại từ đó.
slowly | /ˈsloʊli/ | adv | một cách chậm rãi | Please speak slowly. | Làm ơn nói chậm thôi.
maybe | /ˈmeɪbi/ | adv | có lẽ, có thể | Maybe it will rain today. | Có lẽ hôm nay trời sẽ mưa.
question | /ˈkwestʃən/ | n | câu hỏi | I have a question. | Tôi có một câu hỏi.
answer | /ˈænsər/ | n | câu trả lời; (v) trả lời | What is the answer? | Câu trả lời là gì?
again | /əˈɡen/ | adv | lần nữa, lại | Say it again, please. | Làm ơn nói lại lần nữa.

## A1 | a1-time | Numbers & Time | Số đếm và thời gian
number | /ˈnʌmbər/ | n | số, con số | My phone number is easy to remember. | Số điện thoại của tôi dễ nhớ. | 🔢
ten | /ten/ | n | số mười | I have ten books. | Tôi có mười quyển sách.
hundred | /ˈhʌndrəd/ | n | một trăm | The shirt costs one hundred dollars. | Cái áo giá một trăm đô la.
thousand | /ˈθaʊznd/ | n | một nghìn | A thousand people came to the party. | Một nghìn người đã đến bữa tiệc.
half | /hæf/ | n | một nửa | I ate half of the cake. | Tôi đã ăn một nửa cái bánh.
today | /təˈdeɪ/ | adv | hôm nay | Today is Monday. | Hôm nay là thứ Hai.
tomorrow | /təˈmɑːroʊ/ | adv | ngày mai | I have a test tomorrow. | Ngày mai tôi có bài kiểm tra.
yesterday | /ˈjestərdeɪ/ | adv | hôm qua | I was at home yesterday. | Hôm qua tôi ở nhà.
morning | /ˈmɔːrnɪŋ/ | n | buổi sáng | I drink tea in the morning. | Tôi uống trà vào buổi sáng. | 🌅
afternoon | /ˌæftərˈnuːn/ | n | buổi chiều | We play football in the afternoon. | Chúng tôi chơi bóng đá vào buổi chiều.
evening | /ˈiːvnɪŋ/ | n | buổi tối | We eat dinner in the evening. | Chúng tôi ăn tối vào buổi tối. | 🌆
night | /naɪt/ | n | ban đêm | I sleep at night. | Tôi ngủ vào ban đêm. | 🌙
week | /wiːk/ | n | tuần | There are seven days in a week. | Một tuần có bảy ngày.
month | /mʌnθ/ | n | tháng | My birthday is next month. | Sinh nhật tôi vào tháng sau.
year | /jɪr/ | n | năm | This year I want to learn English. | Năm nay tôi muốn học tiếng Anh.
hour | /ˈaʊər/ | n | giờ, tiếng (60 phút) | The class is one hour long. | Buổi học dài một tiếng.
minute | /ˈmɪnɪt/ | n | phút | Wait a minute, please. | Làm ơn đợi một phút.
birthday | /ˈbɜːrθdeɪ/ | n | sinh nhật | Happy birthday! | Chúc mừng sinh nhật! | 🎂

## A1 | a1-family | Family & People | Gia đình và con người
mother | /ˈmʌðər/ | n | mẹ | My mother is a teacher. | Mẹ tôi là giáo viên.
father | /ˈfɑːðər/ | n | bố, cha | My father drives a taxi. | Bố tôi lái taxi.
parents | /ˈperənts/ | n | bố mẹ | My parents live in Hanoi. | Bố mẹ tôi sống ở Hà Nội.
sister | /ˈsɪstər/ | n | chị gái, em gái | My sister is ten years old. | Em gái tôi mười tuổi.
brother | /ˈbrʌðər/ | n | anh trai, em trai | I have one brother. | Tôi có một người anh (em) trai.
grandmother | /ˈɡrænmʌðər/ | n | bà | My grandmother cooks very well. | Bà tôi nấu ăn rất ngon. | 👵
grandfather | /ˈɡrænfɑːðər/ | n | ông | My grandfather tells good stories. | Ông tôi kể chuyện rất hay. | 👴
son | /sʌn/ | n | con trai | Their son is five. | Con trai họ năm tuổi.
daughter | /ˈdɔːtər/ | n | con gái | Her daughter likes music. | Con gái cô ấy thích âm nhạc.
husband | /ˈhʌzbənd/ | n | chồng | Her husband works at a bank. | Chồng cô ấy làm việc ở ngân hàng.
wife | /waɪf/ | n | vợ | His wife is a doctor. | Vợ anh ấy là bác sĩ.
baby | /ˈbeɪbi/ | n | em bé | The baby is sleeping. | Em bé đang ngủ. | 👶
child | /tʃaɪld/ | n | đứa trẻ | Every child needs love. | Đứa trẻ nào cũng cần tình yêu thương. | 🧒
boy | /bɔɪ/ | n | cậu bé, con trai | The boy has a red ball. | Cậu bé có một quả bóng đỏ. | 👦
girl | /ɡɜːrl/ | n | cô bé, con gái | The girl is reading a book. | Cô bé đang đọc sách. | 👧
man | /mæn/ | n | đàn ông | That man is my uncle. | Người đàn ông đó là chú tôi. | 👨
woman | /ˈwʊmən/ | n | phụ nữ | The woman is very kind. | Người phụ nữ ấy rất tốt bụng. | 👩
family | /ˈfæməli/ | n | gia đình | I live with my family. | Tôi sống cùng gia đình. | 👪

## A1 | a1-food | Food & Drink | Đồ ăn thức uống
rice | /raɪs/ | n | cơm, gạo | We eat rice every day. | Chúng tôi ăn cơm mỗi ngày. | 🍚
bread | /bred/ | n | bánh mì | I eat bread for breakfast. | Tôi ăn bánh mì vào bữa sáng. | 🍞
egg | /eɡ/ | n | trứng | I want an egg, please. | Làm ơn cho tôi một quả trứng. | 🥚
milk | /mɪlk/ | n | sữa | Children drink milk. | Trẻ em uống sữa. | 🥛
water | /ˈwɔːtər/ | n | nước | Can I have some water? | Cho tôi xin ít nước được không? | 💧
coffee | /ˈkɔːfi/ | n | cà phê | He drinks coffee in the morning. | Anh ấy uống cà phê vào buổi sáng. | ☕
tea | /tiː/ | n | trà | Would you like some tea? | Bạn có muốn uống trà không? | 🍵
fruit | /fruːt/ | n | trái cây | I eat fruit every day. | Tôi ăn trái cây mỗi ngày. | 🍉
apple | /ˈæpl/ | n | quả táo | This apple is sweet. | Quả táo này ngọt. | 🍎
banana | /bəˈnænə/ | n | quả chuối | A banana is yellow. | Quả chuối màu vàng. | 🍌
chicken | /ˈtʃɪkɪn/ | n | thịt gà; con gà | We have chicken for dinner. | Chúng tôi ăn gà vào bữa tối. | 🍗
fish | /fɪʃ/ | n | cá | My father likes fish. | Bố tôi thích cá. | 🐟
meat | /miːt/ | n | thịt | She does not eat meat. | Cô ấy không ăn thịt. | 🥩
vegetable | /ˈvedʒtəbl/ | n | rau củ | A carrot is a vegetable. | Cà rốt là một loại rau củ. | 🥦
soup | /suːp/ | n | súp, canh | The soup is hot. | Món súp còn nóng. | 🍲
breakfast | /ˈbrekfəst/ | n | bữa sáng | I have breakfast at seven. | Tôi ăn sáng lúc bảy giờ. | 🍳
lunch | /lʌntʃ/ | n | bữa trưa | Let's have lunch together. | Chúng ta ăn trưa cùng nhau nhé. | 🍱
dinner | /ˈdɪnər/ | n | bữa tối | Dinner is ready. | Bữa tối đã sẵn sàng. | 🍝

## A1 | a1-body | Body & Health | Cơ thể và sức khỏe
head | /hed/ | n | đầu | My head hurts. | Tôi bị đau đầu.
hair | /her/ | n | tóc | She has long hair. | Cô ấy có mái tóc dài.
face | /feɪs/ | n | khuôn mặt | Wash your face. | Hãy rửa mặt. | 🙂
eye | /aɪ/ | n | mắt | He has a small cut near his eye. | Anh ấy có một vết cắt nhỏ gần mắt. | 👁️
ear | /ɪr/ | n | tai | He whispered in my ear. | Anh ấy thì thầm vào tai tôi. | 👂
nose | /noʊz/ | n | mũi | I have a cold and a red nose. | Tôi bị cảm và mũi đỏ. | 👃
mouth | /maʊθ/ | n | miệng | Open your mouth, please. | Làm ơn há miệng ra. | 👄
tooth | /tuːθ/ | n | răng | I have a pain in my tooth. | Tôi bị đau một chiếc răng. | 🦷
hand | /hænd/ | n | bàn tay | Give me your hand. | Hãy đưa tay cho tôi. | ✋
arm | /ɑːrm/ | n | cánh tay | He broke his arm. | Anh ấy bị gãy tay. | 💪
leg | /leɡ/ | n | chân (từ đùi xuống) | My leg is tired after the walk. | Chân tôi mỏi sau khi đi bộ. | 🦵
foot | /fʊt/ | n | bàn chân | I hurt my foot. | Tôi bị đau bàn chân. | 🦶
stomach | /ˈstʌmək/ | n | dạ dày, bụng | My stomach hurts. | Tôi bị đau bụng.
heart | /hɑːrt/ | n | tim | Her heart is strong. | Tim cô ấy khỏe. | ❤️
sick | /sɪk/ | adj | ốm, bệnh | I am sick today. | Hôm nay tôi bị ốm. | 🤒
tired | /ˈtaɪərd/ | adj | mệt | I am very tired. | Tôi rất mệt. | 😴
doctor | /ˈdɑːktər/ | n | bác sĩ | The doctor is kind. | Bác sĩ rất tốt bụng. | 👨‍⚕️
medicine | /ˈmedɪsn/ | n | thuốc | Take this medicine twice a day. | Hãy uống thuốc này hai lần một ngày. | 💊

## A1 | a1-home | Home & Things | Nhà cửa và đồ vật
house | /haʊs/ | n | ngôi nhà | Their house is near the park. | Nhà họ gần công viên. | 🏠
room | /ruːm/ | n | căn phòng | My room is small. | Phòng tôi nhỏ.
door | /dɔːr/ | n | cửa ra vào | Please close the door. | Làm ơn đóng cửa lại. | 🚪
window | /ˈwɪndoʊ/ | n | cửa sổ | Open the window, please. | Làm ơn mở cửa sổ.
bed | /bed/ | n | giường | The bed is soft and warm. | Chiếc giường mềm và ấm. | 🛏️
table | /ˈteɪbl/ | n | cái bàn | The book is on the table. | Quyển sách ở trên bàn.
chair | /tʃer/ | n | cái ghế | Sit on the chair. | Hãy ngồi lên ghế. | 🪑
kitchen | /ˈkɪtʃɪn/ | n | nhà bếp | My mother is in the kitchen. | Mẹ tôi đang ở trong bếp.
bathroom | /ˈbæθruːm/ | n | phòng tắm | The bathroom is on the left. | Phòng tắm ở bên trái. | 🚿
bedroom | /ˈbedruːm/ | n | phòng ngủ | My bedroom has a big window. | Phòng ngủ của tôi có cửa sổ lớn.
phone | /foʊn/ | n | điện thoại | Where is my phone? | Điện thoại của tôi đâu rồi? | 📱
book | /bʊk/ | n | quyển sách | This book is interesting. | Quyển sách này thú vị. | 📖
bag | /bæɡ/ | n | cái túi, cặp | My bag is heavy. | Cặp của tôi nặng. | 🎒
key | /kiː/ | n | chìa khóa | I lost my key. | Tôi làm mất chìa khóa. | 🔑
clock | /klɑːk/ | n | đồng hồ treo tường | The clock is on the wall. | Đồng hồ ở trên tường. | 🕒
lamp | /læmp/ | n | đèn | Turn on the lamp. | Hãy bật đèn lên. | 💡
computer | /kəmˈpjuːtər/ | n | máy tính | I use a computer every day. | Tôi dùng máy tính mỗi ngày. | 💻
garden | /ˈɡɑːrdn/ | n | khu vườn | We have a small garden. | Chúng tôi có một khu vườn nhỏ. | 🌷

## A1 | a1-verbs | Everyday Verbs | Động từ thường dùng
go | /ɡoʊ/ | v | đi | I go to school by bus. | Tôi đi học bằng xe buýt.
come | /kʌm/ | v | đến, tới | Please come here. | Làm ơn lại đây.
eat | /iːt/ | v | ăn | We eat dinner at seven. | Chúng tôi ăn tối lúc bảy giờ.
drink | /drɪŋk/ | v | uống | I drink water every day. | Tôi uống nước mỗi ngày.
sleep | /sliːp/ | v | ngủ | Babies sleep a lot. | Em bé ngủ rất nhiều.
work | /wɜːrk/ | v | làm việc | I work in an office. | Tôi làm việc ở văn phòng.
study | /ˈstʌdi/ | v | học | I study English every night. | Tối nào tôi cũng học tiếng Anh.
read | /riːd/ | v | đọc | I read a book before bed. | Tôi đọc sách trước khi đi ngủ.
write | /raɪt/ | v | viết | Please write your name here. | Làm ơn viết tên bạn ở đây.
listen | /ˈlɪsn/ | v | nghe (chú ý) | Listen to the teacher. | Hãy nghe thầy cô giảng.
speak | /spiːk/ | v | nói | Can you speak English? | Bạn có nói được tiếng Anh không?
play | /pleɪ/ | v | chơi | The children play in the park. | Bọn trẻ chơi trong công viên.
buy | /baɪ/ | v | mua | I want to buy some bread. | Tôi muốn mua ít bánh mì.
want | /wɑːnt/ | v | muốn | I want a cup of tea. | Tôi muốn một tách trà.
like | /laɪk/ | v | thích | I like music. | Tôi thích âm nhạc.
love | /lʌv/ | v | yêu, rất thích | I love this song. | Tôi rất thích bài hát này.
have | /hæv/ | v | có | I have two brothers. | Tôi có hai anh em trai.
help | /help/ | v | giúp đỡ | Can you help me? | Bạn giúp tôi được không?

## A1 | a1-adj | Describing Words | Từ miêu tả
big | /bɪɡ/ | adj | to, lớn | This is a big house. | Đây là một ngôi nhà lớn.
small | /smɔːl/ | adj | nhỏ | I have a small bag. | Tôi có một cái túi nhỏ.
new | /nuː/ | adj | mới | I have a new phone. | Tôi có một chiếc điện thoại mới.
old | /oʊld/ | adj | cũ; già | My grandfather is old. | Ông tôi đã già.
good | /ɡʊd/ | adj | tốt, giỏi, ngon | This soup is good. | Món súp này ngon.
bad | /bæd/ | adj | xấu, tệ | The weather is bad today. | Hôm nay thời tiết xấu.
hot | /hɑːt/ | adj | nóng | The tea is hot. | Trà còn nóng. | 🔥
cold | /koʊld/ | adj | lạnh | It is cold in winter. | Mùa đông trời lạnh. | 🥶
happy | /ˈhæpi/ | adj | vui, hạnh phúc | I am happy today. | Hôm nay tôi vui. | 😀
sad | /sæd/ | adj | buồn | She is sad. | Cô ấy buồn. | 😢
easy | /ˈiːzi/ | adj | dễ | The test is easy. | Bài kiểm tra dễ.
hard | /hɑːrd/ | adj | khó; cứng | This word is hard. | Từ này khó.
fast | /fæst/ | adj | nhanh | The train is fast. | Tàu chạy nhanh.
slow | /sloʊ/ | adj | chậm | The bus is slow. | Xe buýt chạy chậm.
cheap | /tʃiːp/ | adj | rẻ | These shoes are cheap. | Đôi giày này rẻ.
expensive | /ɪkˈspensɪv/ | adj | đắt | That car is expensive. | Chiếc xe đó đắt.
beautiful | /ˈbjuːtɪfl/ | adj | đẹp | The garden is beautiful. | Khu vườn rất đẹp.
clean | /kliːn/ | adj | sạch | My room is clean. | Phòng tôi sạch sẽ.

## A1 | a1-color | Colors & Animals | Màu sắc và động vật
red | /red/ | adj | màu đỏ | She has a red bag. | Cô ấy có một cái túi màu đỏ. | 🔴
blue | /bluː/ | adj | màu xanh dương | The sky is blue. | Bầu trời màu xanh. | 🔵
green | /ɡriːn/ | adj | màu xanh lá | The grass is green. | Cỏ màu xanh lá. | 🟢
yellow | /ˈjeloʊ/ | adj | màu vàng | I like yellow flowers. | Tôi thích hoa màu vàng. | 🟡
black | /blæk/ | adj | màu đen | He wears a black hat. | Anh ấy đội một cái mũ đen. | ⚫
white | /waɪt/ | adj | màu trắng | Her dress is white. | Váy của cô ấy màu trắng. | ⚪
orange | /ˈɔːrɪndʒ/ | adj | màu cam; quả cam | The sun is orange in the evening. | Buổi chiều mặt trời có màu cam. | 🟠
pink | /pɪŋk/ | adj | màu hồng | She likes pink shoes. | Cô ấy thích đôi giày màu hồng.
brown | /braʊn/ | adj | màu nâu | My dog is brown. | Con chó của tôi màu nâu. | 🟤
dog | /dɔːɡ/ | n | con chó | I have a dog. | Tôi có một con chó. | 🐶
cat | /kæt/ | n | con mèo | The cat is on the chair. | Con mèo ở trên ghế. | 🐱
bird | /bɜːrd/ | n | con chim | I can see a bird. | Tôi thấy một con chim. | 🐦
horse | /hɔːrs/ | n | con ngựa | The horse runs fast. | Con ngựa chạy nhanh. | 🐴
cow | /kaʊ/ | n | con bò | The cow gives milk. | Con bò cho sữa. | 🐮
pig | /pɪɡ/ | n | con lợn | The pig is on the farm. | Con lợn ở trong trang trại. | 🐷
rabbit | /ˈræbɪt/ | n | con thỏ | The rabbit eats carrots. | Con thỏ ăn cà rốt. | 🐰
monkey | /ˈmʌŋki/ | n | con khỉ | The monkey likes bananas. | Con khỉ thích chuối. | 🐵
elephant | /ˈelɪfənt/ | n | con voi | An elephant is very big. | Con voi rất to. | 🐘

## A1 | a1-places | Places & Transport | Địa điểm và phương tiện
school | /skuːl/ | n | trường học | I go to school by bike. | Tôi đi học bằng xe đạp. | 🏫
shop | /ʃɑːp/ | n | cửa hàng | The shop opens at eight. | Cửa hàng mở cửa lúc tám giờ. | 🏪
market | /ˈmɑːrkɪt/ | n | chợ | We buy fish at the market. | Chúng tôi mua cá ở chợ.
hospital | /ˈhɑːspɪtl/ | n | bệnh viện | My aunt works in a hospital. | Dì tôi làm việc ở bệnh viện. | 🏥
bank | /bæŋk/ | n | ngân hàng | The bank is next to the park. | Ngân hàng ở cạnh công viên. | 🏦
park | /pɑːrk/ | n | công viên | We walk in the park. | Chúng tôi đi dạo trong công viên. | 🌳
street | /striːt/ | n | đường phố | This street is very busy. | Con phố này rất đông. | 🛣️
city | /ˈsɪti/ | n | thành phố | Hanoi is a big city. | Hà Nội là một thành phố lớn. | 🏙️
restaurant | /ˈrestərɑːnt/ | n | nhà hàng | This restaurant is very good. | Nhà hàng này rất ngon.
bus | /bʌs/ | n | xe buýt | I take the bus to work. | Tôi đi xe buýt đến chỗ làm. | 🚌
car | /kɑːr/ | n | ô tô | My father has a new car. | Bố tôi có một chiếc ô tô mới. | 🚗
train | /treɪn/ | n | tàu hỏa | The train is late. | Tàu bị trễ. | 🚆
bike | /baɪk/ | n | xe đạp | I ride my bike to the market. | Tôi đạp xe ra chợ. | 🚲
taxi | /ˈtæksi/ | n | xe taxi | Let's take a taxi. | Chúng ta đi taxi nhé. | 🚕
airport | /ˈerpɔːrt/ | n | sân bay | The airport is far from the city. | Sân bay cách xa thành phố. | ✈️
left | /left/ | adj | bên trái | Turn left at the bank. | Rẽ trái ở chỗ ngân hàng.
right | /raɪt/ | adj | bên phải; đúng | Turn right at the park. | Rẽ phải ở chỗ công viên.
near | /nɪr/ | adj | gần | The shop is near my house. | Cửa hàng gần nhà tôi.

## A2 | a2-routine | Daily Routine | Thói quen hằng ngày
wake up |  | phr v | thức dậy | I wake up at six every day. | Tôi thức dậy lúc sáu giờ mỗi ngày.
get up |  | phr v | ngủ dậy, ra khỏi giường | I get up at six thirty. | Tôi ngủ dậy lúc sáu giờ ba mươi.
go to bed |  | phr v | đi ngủ | I go to bed at eleven. | Tôi đi ngủ lúc mười một giờ.
take a shower |  | phr v | đi tắm (vòi sen) | I take a shower after work. | Tôi đi tắm sau giờ làm.
usually | /ˈjuːʒuəli/ | adv | thường thường | I usually walk to work. | Tôi thường đi bộ đến chỗ làm.
always | /ˈɔːlweɪz/ | adv | luôn luôn | She always smiles. | Cô ấy luôn mỉm cười.
sometimes | /ˈsʌmtaɪmz/ | adv | thỉnh thoảng | Sometimes I cook dinner. | Thỉnh thoảng tôi nấu bữa tối.
never | /ˈnevər/ | adv | không bao giờ | I never drink coffee at night. | Tôi không bao giờ uống cà phê buổi tối.
early | /ˈɜːrli/ | adj | sớm | I get up early on Sundays. | Chủ nhật tôi dậy sớm.
late | /leɪt/ | adj | muộn, trễ | The bus is late again. | Xe buýt lại trễ.
busy | /ˈbɪzi/ | adj | bận | I am busy today. | Hôm nay tôi bận.
ready | /ˈredi/ | adj | sẵn sàng | Are you ready? | Bạn sẵn sàng chưa?
wait | /weɪt/ | v | chờ, đợi | Please wait here. | Làm ơn đợi ở đây.
leave | /liːv/ | v | rời đi; để lại | I leave home at seven. | Tôi rời nhà lúc bảy giờ.
arrive | /əˈraɪv/ | v | đến nơi | We arrive at noon. | Chúng tôi đến nơi vào buổi trưa.
finish | /ˈfɪnɪʃ/ | v | hoàn thành, kết thúc | I finish work at five. | Tôi tan làm lúc năm giờ.

## A2 | a2-hobby | Hobbies & Free Time | Sở thích và giải trí
music | /ˈmjuːzɪk/ | n | âm nhạc | I listen to music every day. | Tôi nghe nhạc mỗi ngày. | 🎵
movie | /ˈmuːvi/ | n | bộ phim | Let's watch a movie tonight. | Tối nay mình xem phim nhé. | 🎬
game | /ɡeɪm/ | n | trò chơi, trận đấu | This game is fun. | Trò chơi này vui. | 🎮
sport | /spɔːrt/ | n | môn thể thao | Tennis is my favorite sport. | Quần vợt là môn thể thao tôi thích nhất. | 🏅
football | /ˈfʊtbɔːl/ | n | bóng đá | We play football on Sunday. | Chúng tôi đá bóng vào Chủ nhật. | ⚽
swimming | /ˈswɪmɪŋ/ | n | bơi lội | Swimming is good for your health. | Bơi lội tốt cho sức khỏe. | 🏊
dancing | /ˈdænsɪŋ/ | n | khiêu vũ, nhảy múa | She loves dancing. | Cô ấy yêu thích nhảy múa. | 💃
singing | /ˈsɪŋɪŋ/ | n | ca hát | I love singing in the shower. | Tôi thích hát trong lúc tắm. | 🎤
painting | /ˈpeɪntɪŋ/ | n | bức tranh; việc vẽ tranh | There is a painting on the wall. | Có một bức tranh trên tường. | 🖼️
camera | /ˈkæmərə/ | n | máy ảnh | I bought a new camera. | Tôi đã mua một chiếc máy ảnh mới. | 📷
photo | /ˈfoʊtoʊ/ | n | bức ảnh | Can I take a photo here? | Tôi chụp ảnh ở đây được không? | 📸
party | /ˈpɑːrti/ | n | bữa tiệc | We have a party on Saturday. | Chúng tôi có một bữa tiệc vào thứ Bảy. | 🎉
concert | /ˈkɑːnsərt/ | n | buổi hòa nhạc | The concert starts at eight. | Buổi hòa nhạc bắt đầu lúc tám giờ. | 🎼
weekend | /ˈwiːkend/ | n | cuối tuần | What do you do at the weekend? | Bạn làm gì vào cuối tuần?
invite | /ɪnˈvaɪt/ | v | mời | I want to invite you to dinner. | Tôi muốn mời bạn đi ăn tối.
enjoy | /ɪnˈdʒɔɪ/ | v | thích thú, tận hưởng | I enjoy cooking. | Tôi thích nấu ăn.

## A2 | a2-shop | Shopping & Clothes | Mua sắm và quần áo
shirt | /ʃɜːrt/ | n | áo sơ mi | He wears a white shirt. | Anh ấy mặc áo sơ mi trắng. | 👕
trousers | /ˈtraʊzərz/ | n | quần dài | These trousers are too long. | Cái quần này quá dài. | 👖
dress | /dres/ | n | váy liền | She has a new dress. | Cô ấy có một chiếc váy mới. | 👗
shoes | /ʃuːz/ | n | giày | My shoes are old. | Giày của tôi đã cũ. | 👟
jacket | /ˈdʒækɪt/ | n | áo khoác | Take your jacket. It is cold. | Hãy mang áo khoác theo. Trời lạnh. | 🧥
hat | /hæt/ | n | mũ | I wear a hat in the sun. | Tôi đội mũ khi trời nắng. | 🧢
size | /saɪz/ | n | cỡ, kích cỡ | What size are your shoes? | Giày bạn cỡ bao nhiêu?
try on |  | phr v | mặc thử | Can I try on this shirt? | Tôi mặc thử cái áo này được không?
wear | /wer/ | v | mặc, đội, đeo | I wear glasses. | Tôi đeo kính.
price | /praɪs/ | n | giá | The price is too high. | Giá cao quá. | 🏷️
pay | /peɪ/ | v | trả tiền | I pay by card. | Tôi trả bằng thẻ.
cash | /kæʃ/ | n | tiền mặt | Do you have cash? | Bạn có tiền mặt không? | 💵
credit card | /ˈkredɪt kɑːrd/ | n | thẻ tín dụng | Can I pay by credit card? | Tôi trả bằng thẻ tín dụng được không? | 💳
sale | /seɪl/ | n | đợt giảm giá; việc bán | The shop has a big sale today. | Hôm nay cửa hàng giảm giá lớn.
customer | /ˈkʌstəmər/ | n | khách hàng | The customer is waiting. | Khách hàng đang chờ.
supermarket | /ˈsuːpərmɑːrkɪt/ | n | siêu thị | I buy fruit at the supermarket. | Tôi mua trái cây ở siêu thị. | 🛒

## A2 | a2-jobs | Jobs & Workplaces | Nghề nghiệp
teacher | /ˈtiːtʃər/ | n | giáo viên | My teacher is very kind. | Giáo viên của tôi rất tốt. | 👩‍🏫
nurse | /nɜːrs/ | n | y tá | The nurse helps the doctor. | Y tá giúp bác sĩ. | 👩‍⚕️
driver | /ˈdraɪvər/ | n | tài xế | The driver is waiting outside. | Tài xế đang đợi bên ngoài.
farmer | /ˈfɑːrmər/ | n | nông dân | The farmer grows rice. | Người nông dân trồng lúa. | 👨‍🌾
engineer | /ˌendʒɪˈnɪr/ | n | kỹ sư | My brother is an engineer. | Anh trai tôi là kỹ sư.
chef | /ʃef/ | n | đầu bếp | The chef cooks fish very well. | Đầu bếp nấu cá rất ngon. | 👨‍🍳
waiter | /ˈweɪtər/ | n | nhân viên phục vụ bàn | The waiter brings the menu. | Người phục vụ mang thực đơn tới.
singer | /ˈsɪŋər/ | n | ca sĩ | She is a famous singer. | Cô ấy là một ca sĩ nổi tiếng.
artist | /ˈɑːrtɪst/ | n | nghệ sĩ, họa sĩ | The artist paints flowers. | Họa sĩ vẽ hoa. | 🎨
worker | /ˈwɜːrkər/ | n | công nhân, người lao động | He is a factory worker. | Anh ấy là công nhân nhà máy. | 👷
boss | /bɔːs/ | n | sếp | My boss is at a meeting. | Sếp tôi đang họp.
office | /ˈɔːfɪs/ | n | văn phòng | The office opens at eight. | Văn phòng mở cửa lúc tám giờ. | 🏢
company | /ˈkʌmpəni/ | n | công ty | This company makes shoes. | Công ty này sản xuất giày.
job | /dʒɑːb/ | n | công việc | I want a new job. | Tôi muốn một công việc mới.
pilot | /ˈpaɪlət/ | n | phi công | My uncle is a pilot. | Chú tôi là phi công. | 👨‍✈️
police officer | /pəˈliːs ˈɔːfɪsər/ | n | cảnh sát | A police officer helped us. | Một cảnh sát đã giúp chúng tôi. | 👮

## A2 | a2-weather | Weather & Seasons | Thời tiết và các mùa
sunny | /ˈsʌni/ | adj | có nắng | It is sunny today. | Hôm nay trời nắng. | ☀️
rainy | /ˈreɪni/ | adj | có mưa | It is a rainy day. | Hôm nay là một ngày mưa. | 🌧️
cloudy | /ˈklaʊdi/ | adj | nhiều mây | The sky is cloudy. | Trời nhiều mây. | ☁️
windy | /ˈwɪndi/ | adj | có gió | It is windy at the beach. | Ở bãi biển có gió. | 💨
snowy | /ˈsnoʊi/ | adj | có tuyết | The winter is snowy in Canada. | Mùa đông ở Canada có tuyết. | ❄️
storm | /stɔːrm/ | n | cơn bão | A big storm is coming. | Một cơn bão lớn đang đến. | ⛈️
temperature | /ˈtemprətʃər/ | n | nhiệt độ | The temperature is thirty degrees. | Nhiệt độ là ba mươi độ. | 🌡️
spring | /sprɪŋ/ | n | mùa xuân | Flowers open in spring. | Hoa nở vào mùa xuân. | 🌸
summer | /ˈsʌmər/ | n | mùa hè | We go to the beach in summer. | Chúng tôi đi biển vào mùa hè. | 🌞
autumn | /ˈɔːtəm/ | n | mùa thu | The leaves fall in autumn. | Lá rụng vào mùa thu. | 🍂
winter | /ˈwɪntər/ | n | mùa đông | I wear a coat in winter. | Tôi mặc áo khoác dày vào mùa đông. | ⛄
season | /ˈsiːzn/ | n | mùa | Which season do you like? | Bạn thích mùa nào?
umbrella | /ʌmˈbrelə/ | n | cái ô, dù | Take an umbrella with you. | Hãy mang theo ô. | ☂️
wet | /wet/ | adj | ướt | My shoes are wet. | Giày của tôi bị ướt. | 💦
warm | /wɔːrm/ | adj | ấm | The room is warm. | Căn phòng ấm áp.
cool | /kuːl/ | adj | mát | The evening is cool. | Buổi tối trời mát.

## A2 | a2-travel | Travel Basics | Du lịch cơ bản
ticket | /ˈtɪkɪt/ | n | vé | I need a ticket to Hue. | Tôi cần một vé đi Huế. | 🎫
trip | /trɪp/ | n | chuyến đi | We had a nice trip. | Chúng tôi đã có một chuyến đi vui.
hotel | /hoʊˈtel/ | n | khách sạn | Our hotel is near the beach. | Khách sạn của chúng tôi gần bãi biển. | 🏨
tourist | /ˈtʊrɪst/ | n | khách du lịch | The tourist asked for a map. | Du khách hỏi xin một tấm bản đồ.
guide | /ɡaɪd/ | n | hướng dẫn viên | The guide speaks English. | Hướng dẫn viên nói tiếng Anh.
beach | /biːtʃ/ | n | bãi biển | We walk on the beach. | Chúng tôi đi dạo trên bãi biển. | 🏖️
island | /ˈaɪlənd/ | n | hòn đảo | The island is small and quiet. | Hòn đảo nhỏ và yên tĩnh. | 🏝️
mountain | /ˈmaʊntn/ | n | ngọn núi | The mountain is very high. | Ngọn núi rất cao. | ⛰️
river | /ˈrɪvər/ | n | dòng sông | The river is wide. | Con sông rất rộng. | 🏞️
lake | /leɪk/ | n | hồ | We swim in the lake. | Chúng tôi bơi ở hồ.
tent | /tent/ | n | cái lều | We sleep in a tent. | Chúng tôi ngủ trong lều. | ⛺
suitcase | /ˈsuːtkeɪs/ | n | va li | My suitcase is heavy. | Va li của tôi nặng. | 🧳
flight | /flaɪt/ | n | chuyến bay | The flight takes two hours. | Chuyến bay mất hai tiếng. | 🛫
station | /ˈsteɪʃn/ | n | nhà ga, trạm | The station is near here. | Nhà ga ở gần đây. | 🚉
visit | /ˈvɪzɪt/ | v | thăm, tham quan | I want to visit Da Nang. | Tôi muốn thăm Đà Nẵng.
stay | /steɪ/ | v | ở lại, nghỉ lại | We stay at a small hotel. | Chúng tôi ở một khách sạn nhỏ.

## A2 | a2-feel | Feelings & Opinions | Cảm xúc và ý kiến
angry | /ˈæŋɡri/ | adj | tức giận | He is angry with me. | Anh ấy giận tôi. | 😠
afraid | /əˈfreɪd/ | adj | sợ | I am afraid of dogs. | Tôi sợ chó. | 😨
bored | /bɔːrd/ | adj | chán | I am bored at home. | Tôi thấy chán khi ở nhà. | 🥱
excited | /ɪkˈsaɪtɪd/ | adj | hào hứng | We are excited about the trip. | Chúng tôi háo hức về chuyến đi. | 🤩
surprised | /sərˈpraɪzd/ | adj | ngạc nhiên | I was surprised by the news. | Tôi ngạc nhiên trước tin đó. | 😲
worried | /ˈwɜːrid/ | adj | lo lắng | She is worried about the test. | Cô ấy lo lắng về bài kiểm tra. | 😟
lonely | /ˈloʊnli/ | adj | cô đơn | He feels lonely in the city. | Anh ấy thấy cô đơn ở thành phố. | 😔
proud | /praʊd/ | adj | tự hào | I am proud of you. | Tôi tự hào về bạn.
nervous | /ˈnɜːrvəs/ | adj | hồi hộp, lo | I feel nervous before exams. | Tôi thấy hồi hộp trước kỳ thi. | 😬
relaxed | /rɪˈlækst/ | adj | thư giãn | I feel relaxed on holiday. | Tôi thấy thư giãn khi đi nghỉ. | 😌
upset | /ʌpˈset/ | adj | buồn bực, khó chịu | She was upset about the result. | Cô ấy buồn bực vì kết quả. | 😞
favorite | /ˈfeɪvərɪt/ | adj | yêu thích | Blue is my favorite color. | Xanh dương là màu tôi yêu thích nhất.
think | /θɪŋk/ | v | nghĩ | I think it is a good idea. | Tôi nghĩ đó là ý hay.
agree | /əˈɡriː/ | v | đồng ý | I agree with you. | Tôi đồng ý với bạn.
prefer | /prɪˈfɜːr/ | v | thích hơn | I prefer tea to coffee. | Tôi thích trà hơn cà phê.
hope | /hoʊp/ | v | hy vọng | I hope you feel better. | Tôi hy vọng bạn khỏe hơn.

## A2 | a2-dine | Dining Table | Bàn ăn và nhà hàng
menu | /ˈmenjuː/ | n | thực đơn | Can I see the menu, please? | Cho tôi xem thực đơn được không? | 📋
order | /ˈɔːrdər/ | v | gọi món, đặt hàng | Are you ready to order? | Bạn sẵn sàng gọi món chưa?
delicious | /dɪˈlɪʃəs/ | adj | ngon tuyệt | The cake is delicious. | Chiếc bánh rất ngon. | 😋
salty | /ˈsɔːlti/ | adj | mặn | This soup is too salty. | Món súp này mặn quá. | 🧂
sweet | /swiːt/ | adj | ngọt | I like sweet tea. | Tôi thích trà ngọt. | 🍬
sour | /ˈsaʊər/ | adj | chua | The lemon is sour. | Quả chanh chua. | 🍋
fresh | /freʃ/ | adj | tươi | The fish is fresh. | Cá này tươi.
plate | /pleɪt/ | n | cái đĩa | Put the food on the plate. | Hãy đặt thức ăn lên đĩa.
bowl | /boʊl/ | n | cái bát, tô | I want a bowl of rice. | Tôi muốn một bát cơm. | 🥣
spoon | /spuːn/ | n | cái thìa | Use a spoon for the soup. | Dùng thìa để ăn súp. | 🥄
fork | /fɔːrk/ | n | cái nĩa | I need a fork. | Tôi cần một cái nĩa. | 🍴
knife | /naɪf/ | n | con dao | The knife is sharp. | Con dao rất sắc. | 🔪
chopsticks | /ˈtʃɑːpstɪks/ | n | đôi đũa | I use chopsticks every day. | Tôi dùng đũa mỗi ngày. | 🥢
cup | /kʌp/ | n | tách, cốc | A cup of tea, please. | Cho tôi một tách trà.
glass | /ɡlæs/ | n | cái ly; thủy tinh | I want a glass of water. | Tôi muốn một ly nước.
bottle | /ˈbɑːtl/ | n | cái chai | Please buy a bottle of water. | Làm ơn mua một chai nước.

## B1 | daily | Daily Life | Cuộc sống hằng ngày
routine | /ruːˈtiːn/ | n | thói quen hằng ngày, lịch sinh hoạt | My morning routine takes about an hour.
commute | /kəˈmjuːt/ | v | đi làm hằng ngày (đường xa) | I commute to work by bus.
schedule | /ˈskedʒuːl/ | n | lịch trình, thời gian biểu | My schedule is full this week.
chore | /tʃɔːr/ | n | việc vặt trong nhà | Washing dishes is my least favorite chore.
neighbor | /ˈneɪbər/ | n | hàng xóm | Our neighbor waters the plants when we travel.
laundry | /ˈlɔːndri/ | n | đồ giặt; việc giặt giũ | I do the laundry on Sundays.
errand | /ˈerənd/ | n | việc vặt bên ngoài (đi chợ, gửi thư...) | I have one more errand to run after lunch.
appointment | /əˈpɔɪntmənt/ | n | cuộc hẹn (bác sĩ, công việc) | I have a dentist appointment at three.
deadline | /ˈdedlaɪn/ | n | hạn chót | The deadline is Friday at noon.
habit | /ˈhæbɪt/ | n | thói quen | Reading before bed is a good habit.
leisure | /ˈliːʒər/ | n | thời gian rảnh rỗi, giải trí | She reads novels in her leisure time.
hobby | /ˈhɑːbi/ | n | sở thích | My hobby is photography.
alarm | /əˈlɑːrm/ | n | chuông báo thức; còi báo động | My alarm goes off at six.
exhausted | /ɪɡˈzɔːstɪd/ | adj | kiệt sức | I was exhausted after the long day.
cozy | /ˈkoʊzi/ | adj | ấm cúng, dễ chịu | We spent a cozy evening at home.
spare time | /sper taɪm/ | n | thời gian rảnh | What do you do in your spare time?
weekday | /ˈwiːkdeɪ/ | n | ngày trong tuần (thứ Hai đến thứ Sáu) | Traffic is heavy on every weekday.
recharge | /ˌriːˈtʃɑːrdʒ/ | v | nạp lại năng lượng; sạc lại | A short walk helps me recharge.
procrastinate | /proʊˈkræstɪneɪt/ | v | trì hoãn, chần chừ | I procrastinate when a task feels too big.
tidy | /ˈtaɪdi/ | adj | gọn gàng, ngăn nắp | Please keep your room tidy.

## B1 | food | Food & Dining | Ẩm thực
cuisine | /kwɪˈziːn/ | n | ẩm thực, phong cách nấu ăn | Vietnamese cuisine uses a lot of fresh herbs.
ingredient | /ɪnˈɡriːdiənt/ | n | nguyên liệu | The main ingredient in this dish is coconut milk.
recipe | /ˈresəpi/ | n | công thức nấu ăn | Can you share the recipe for this cake?
appetizer | /ˈæpɪtaɪzər/ | n | món khai vị | We ordered spring rolls as an appetizer.
dessert | /dɪˈzɜːrt/ | n | món tráng miệng | Do you have room for dessert?
leftovers | /ˈleftoʊvərz/ | n | đồ ăn thừa | We ate the leftovers for lunch.
flavor | /ˈfleɪvər/ | n | hương vị | This tea has a gentle flavor of jasmine.
spicy | /ˈspaɪsi/ | adj | cay | This soup is too spicy for me.
bitter | /ˈbɪtər/ | adj | đắng | Dark chocolate tastes slightly bitter.
crispy | /ˈkrɪspi/ | adj | giòn | The fried chicken was golden and crispy.
tender | /ˈtendər/ | adj | mềm (thịt, rau) | Cook the beef until it is tender.
bill | /bɪl/ | n | hóa đơn (nhà hàng, tiền điện...) | Could we have the bill, please?
tip | /tɪp/ | n | tiền boa; lời khuyên nhỏ | Leave a tip if the service was good.
reservation | /ˌrezərˈveɪʃn/ | n | sự đặt bàn/đặt chỗ | I made a reservation for four at seven.
portion | /ˈpɔːrʃn/ | n | khẩu phần, một phần ăn | The portion was too big for one person.
vegetarian | /ˌvedʒəˈteriən/ | n | người ăn chay; (adj) chay | My sister is a vegetarian.
allergic | /əˈlɜːrdʒɪk/ | adj | dị ứng | He is allergic to peanuts.
simmer | /ˈsɪmər/ | v | ninh nhỏ lửa | Let the sauce simmer for twenty minutes.
chop | /tʃɑːp/ | v | thái, chặt | Chop the onions into small pieces.
seasoning | /ˈsiːzənɪŋ/ | n | gia vị nêm nếm | Add a little seasoning before serving.

## B1 | travel | Travel | Du lịch
destination | /ˌdestɪˈneɪʃn/ | n | điểm đến | Da Nang is a popular holiday destination.
itinerary | /aɪˈtɪnəreri/ | n | lịch trình chuyến đi | Our itinerary includes three cities in five days.
luggage | /ˈlʌɡɪdʒ/ | n | hành lý | Please keep your luggage with you at all times.
boarding pass | /ˈbɔːrdɪŋ pæs/ | n | thẻ lên máy bay | Show your boarding pass at the gate.
customs | /ˈkʌstəmz/ | n | hải quan | We went through customs quickly.
passport | /ˈpæspɔːrt/ | n | hộ chiếu | Don't forget to bring your passport.
visa | /ˈviːzə/ | n | thị thực (visa) | You need a visa to enter that country.
delay | /dɪˈleɪ/ | n | sự trì hoãn, chậm trễ | The flight has a two-hour delay.
accommodation | /əˌkɑːməˈdeɪʃn/ | n | chỗ ở | Accommodation in the old town is expensive in summer.
sightseeing | /ˈsaɪtsiːɪŋ/ | n | việc tham quan, ngắm cảnh | We spent the day sightseeing in Hue.
souvenir | /ˌsuːvəˈnɪr/ | n | quà lưu niệm | I bought a small souvenir for my mother.
tourist attraction | /ˈtʊrɪst əˈtrækʃn/ | n | địa điểm thu hút khách du lịch | The old bridge is a popular tourist attraction.
departure | /dɪˈpɑːrtʃər/ | n | sự khởi hành | The departure time is 8:45.
arrival | /əˈraɪvl/ | n | sự đến nơi | Our arrival was delayed by the storm.
round trip | /ˌraʊnd ˈtrɪp/ | n | chuyến khứ hồi | A round trip ticket costs less than two singles.
backpacker | /ˈbækpækər/ | n | khách du lịch bụi | A backpacker needs a light, sturdy bag.
jet lag | /ˈdʒet læɡ/ | n | mệt mỏi do lệch múi giờ | I had terrible jet lag after the flight.
layover | /ˈleɪoʊvər/ | n | thời gian quá cảnh, nghỉ giữa chặng bay | We had a five-hour layover in Seoul.
overbook | /ˌoʊvərˈbʊk/ | v | bán/đặt quá số chỗ | Airlines sometimes overbook their flights.
scenic | /ˈsiːnɪk/ | adj | có phong cảnh đẹp | We took the scenic route along the coast.

## B1 | work | Work & Office | Công việc, văn phòng
colleague | /ˈkɑːliːɡ/ | n | đồng nghiệp | My colleague helped me finish the report.
manager | /ˈmænɪdʒər/ | n | quản lý | Our manager is hiring two new designers.
meeting | /ˈmiːtɪŋ/ | n | cuộc họp | The meeting starts at ten sharp.
résumé | /ˈrezəmeɪ/ | n | sơ yếu lý lịch (CV) | Please attach your résumé to the email.
interview | /ˈɪntərvjuː/ | n | buổi phỏng vấn | I have a job interview tomorrow.
promotion | /prəˈmoʊʃn/ | n | sự thăng chức | She got a promotion after two years.
salary | /ˈsæləri/ | n | tiền lương (theo tháng/năm) | The salary is higher than my old job.
overtime | /ˈoʊvərtaɪm/ | n | giờ làm thêm | We worked overtime to meet the deadline.
workload | /ˈwɜːrkloʊd/ | n | khối lượng công việc | Her workload doubled after the merger.
collaborate | /kəˈlæbəreɪt/ | v | cộng tác | The two teams collaborate on every project.
delegate | /ˈdelɪɡeɪt/ | v | giao việc, ủy thác | A good leader knows how to delegate.
negotiate | /nɪˈɡoʊʃieɪt/ | v | đàm phán, thương lượng | He tried to negotiate a better price.
proposal | /prəˈpoʊzl/ | n | bản đề xuất | We sent the client a detailed proposal.
feedback | /ˈfiːdbæk/ | n | phản hồi, góp ý | Thank you for your honest feedback.
responsibility | /rɪˌspɑːnsəˈbɪləti/ | n | trách nhiệm | Safety is everyone's responsibility.
qualification | /ˌkwɑːlɪfɪˈkeɪʃn/ | n | bằng cấp, trình độ | Do you have the right qualification for this role?
freelance | /ˈfriːlæns/ | adj | làm tự do (không biên chế) | She works as a freelance translator.
resign | /rɪˈzaɪn/ | v | từ chức, xin nghỉ việc | He decided to resign and start his own company.
productive | /prəˈdʌktɪv/ | adj | làm việc hiệu quả, năng suất | I am most productive in the morning.
brainstorm | /ˈbreɪnstɔːrm/ | v | động não, nghĩ ý tưởng | Let's brainstorm some names for the product.

## B1 | health | Health | Sức khỏe
symptom | /ˈsɪmptəm/ | n | triệu chứng | A sore throat is a common symptom of a cold.
prescription | /prɪˈskrɪpʃn/ | n | đơn thuốc | You need a prescription for this medicine.
diagnosis | /ˌdaɪəɡˈnoʊsɪs/ | n | chẩn đoán | The doctor will give a diagnosis after the tests.
injury | /ˈɪndʒəri/ | n | chấn thương | He missed the match because of a knee injury.
recover | /rɪˈkʌvər/ | v | hồi phục | It takes weeks to recover from surgery.
fever | /ˈfiːvər/ | n | cơn sốt | The child has a high fever.
cough | /kɔːf/ | n | cơn ho; (v) ho | I've had a cough for a week.
headache | /ˈhedeɪk/ | n | đau đầu | Too much screen time gives me a headache.
nutrition | /nuˈtrɪʃn/ | n | dinh dưỡng | Good nutrition is important for children.
workout | /ˈwɜːrkaʊt/ | n | buổi tập thể dục | I do a short workout before breakfast.
stamina | /ˈstæmɪnə/ | n | sức bền, sự dẻo dai | Running builds stamina.
immune system | /ɪˈmjuːn ˈsɪstəm/ | n | hệ miễn dịch | Sleep helps strengthen your immune system.
vaccine | /vækˈsiːn/ | n | vắc-xin | The vaccine protects against several diseases.
insomnia | /ɪnˈsɑːmniə/ | n | chứng mất ngủ | Stress can cause insomnia.
stress | /stres/ | n | căng thẳng | Exams cause a lot of stress.
balanced diet | /ˈbælənst ˈdaɪət/ | n | chế độ ăn cân bằng | A balanced diet includes vegetables and protein.
dizzy | /ˈdɪzi/ | adj | chóng mặt | I felt dizzy when I stood up too fast.
swollen | /ˈswoʊlən/ | adj | sưng | My ankle is swollen after the fall.
checkup | /ˈtʃekʌp/ | n | buổi khám sức khỏe định kỳ | I go for a checkup once a year.
well-being | /ˌwel ˈbiːɪŋ/ | n | sức khỏe và hạnh phúc nói chung | Regular exercise improves your well-being.

## B1 | family | Family & Relationships | Gia đình, các mối quan hệ
relative | /ˈrelətɪv/ | n | họ hàng | A distant relative is visiting us this weekend.
sibling | /ˈsɪblɪŋ/ | n | anh/chị/em ruột | My younger sibling is still in school.
grandparent | /ˈɡrænperənt/ | n | ông hoặc bà | My grandparent taught me how to cook.
spouse | /spaʊs/ | n | vợ hoặc chồng | Please bring your spouse to the party.
fiancé | /ˌfiːɑːnˈseɪ/ | n | hôn phu (người đã đính hôn) | She introduced her fiancé to the family.
acquaintance | /əˈkweɪntəns/ | n | người quen (không thân) | He is just an acquaintance from work.
get along | /ɡet əˈlɔːŋ/ | v | hòa thuận, hợp nhau | My sister and I get along well.
trust | /trʌst/ | n | sự tin tưởng; (v) tin | Trust takes years to build.
argument | /ˈɑːrɡjumənt/ | n | cuộc tranh cãi; lập luận | They had an argument about money.
apologize | /əˈpɑːlədʒaɪz/ | v | xin lỗi | I want to apologize for being late.
forgive | /fərˈɡɪv/ | v | tha thứ | It is hard to forgive someone who lied to you.
generation | /ˌdʒenəˈreɪʃn/ | n | thế hệ | Every generation faces new challenges.
upbringing | /ˈʌpbrɪŋɪŋ/ | n | sự nuôi dạy | She had a strict upbringing.
bond | /bɑːnd/ | n | sự gắn kết | Cooking together strengthens the bond between us.
household | /ˈhaʊshoʊld/ | n | hộ gia đình | Every household received a notice.
reunion | /riːˈjuːniən/ | n | cuộc đoàn tụ, họp mặt | We have a family reunion every Tet.
supportive | /səˈpɔːrtɪv/ | adj | hay ủng hộ, biết động viên | My parents are very supportive.
mutual | /ˈmjuːtʃuəl/ | adj | lẫn nhau, chung | We have a mutual friend.
in-laws | /ˈɪn lɔːz/ | n | họ hàng nhà chồng/vợ | We're visiting my in-laws this weekend.
breakup | /ˈbreɪkʌp/ | n | sự chia tay | It took her months to get over the breakup.

## B1 | money | Shopping & Money | Mua sắm, tiền bạc
discount | /ˈdɪskaʊnt/ | n | sự giảm giá | Students get a ten percent discount.
receipt | /rɪˈsiːt/ | n | biên lai, hóa đơn mua hàng | Keep the receipt in case you need a refund.
refund | /ˈriːfʌnd/ | n | tiền hoàn lại | I asked for a refund because the shirt was torn.
warranty | /ˈwɔːrənti/ | n | bảo hành | The laptop comes with a two-year warranty.
bargain | /ˈbɑːrɡən/ | n | món hời; (v) mặc cả | At that price, the jacket was a bargain.
budget | /ˈbʌdʒɪt/ | n | ngân sách | We have a tight budget for the trip.
afford | /əˈfɔːrd/ | v | có đủ tiền/khả năng để | I can't afford a new phone right now.
expense | /ɪkˈspens/ | n | khoản chi phí | Rent is my biggest monthly expense.
income | /ˈɪnkʌm/ | n | thu nhập | Her income comes from two part-time jobs.
savings | /ˈseɪvɪŋz/ | n | tiền tiết kiệm | I use my savings to pay for courses.
debt | /det/ | n | khoản nợ | He is working hard to pay off his debt.
invest | /ɪnˈvest/ | v | đầu tư | She decided to invest in index funds.
interest rate | /ˈɪntrəst reɪt/ | n | lãi suất | The bank raised the interest rate again.
cashier | /kæˈʃɪr/ | n | nhân viên thu ngân | The cashier gave me the wrong change.
checkout | /ˈtʃekaʊt/ | n | quầy thanh toán | There was a long line at the checkout.
out of stock | /ˌaʊt əv ˈstɑːk/ | adj | hết hàng | This size is out of stock.
overpriced | /ˌoʊvərˈpraɪst/ | adj | giá quá đắt so với giá trị | The coffee there is overpriced.
subscription | /səbˈskrɪpʃn/ | n | gói đăng ký định kỳ | I canceled my music subscription.
impulse buy | /ˈɪmpʌls baɪ/ | n | món mua bốc đồng | That candy was an impulse buy.
transaction | /trænˈzækʃn/ | n | giao dịch | The transaction was completed in seconds.

## B1 | city | City & Transport | Thành phố, giao thông
traffic jam | /ˈtræfɪk dʒæm/ | n | kẹt xe | We were stuck in a traffic jam for an hour.
public transport | /ˈpʌblɪk ˈtrænspɔːrt/ | n | giao thông công cộng | I take public transport to work.
pedestrian | /pəˈdestriən/ | n | người đi bộ | Drivers must stop for a pedestrian.
crosswalk | /ˈkrɔːswɔːk/ | n | vạch qua đường | Use the crosswalk when you cross the street.
intersection | /ˌɪntərˈsekʃn/ | n | ngã tư | Turn left at the next intersection.
rush hour | /ˈrʌʃ aʊər/ | n | giờ cao điểm | Avoid the city center during rush hour.
fare | /fer/ | n | giá vé (xe buýt, tàu...) | The bus fare went up this year.
platform | /ˈplætfɔːrm/ | n | sân ga, bục | The train leaves from platform four.
downtown | /ˌdaʊnˈtaʊn/ | n | khu trung tâm thành phố | There are many cafes downtown.
suburb | /ˈsʌbɜːrb/ | n | vùng ngoại ô | They moved to a quiet suburb.
skyscraper | /ˈskaɪskreɪpər/ | n | nhà chọc trời | The skyscraper has more than eighty floors.
overpass | /ˈoʊvərpæs/ | n | cầu vượt | Take the overpass to avoid the traffic lights.
detour | /ˈdiːtʊr/ | n | đường vòng | We took a detour because of road repairs.
congestion | /kənˈdʒestʃən/ | n | sự tắc nghẽn | The new road should reduce congestion.
landmark | /ˈlændmɑːrk/ | n | địa danh, công trình nổi bật | The tower is a famous landmark.
resident | /ˈrezɪdənt/ | n | cư dân | Each resident gets a free library card.
pavement | /ˈpeɪvmənt/ | n | vỉa hè (Anh-Anh) | Motorbikes should not drive on the pavement.
toll | /toʊl/ | n | phí cầu đường | You have to pay a toll on this highway.
carpool | /ˈkɑːrpuːl/ | v | đi chung xe | My colleagues and I carpool to the office.
infrastructure | /ˈɪnfrəstrʌktʃər/ | n | cơ sở hạ tầng | The city is investing in new infrastructure.

## B1 | home | Home & Housing | Nhà ở
landlord | /ˈlændlɔːrd/ | n | chủ nhà (cho thuê) | Our landlord fixed the heater quickly.
tenant | /ˈtenənt/ | n | người thuê nhà | The tenant paid the rent on time.
rent | /rent/ | n | tiền thuê; (v) thuê | We pay rent on the first of the month.
mortgage | /ˈmɔːrɡɪdʒ/ | n | khoản vay thế chấp mua nhà | They took out a mortgage to buy the apartment.
furnished | /ˈfɜːrnɪʃt/ | adj | có sẵn đồ đạc | We rented a furnished studio.
utilities | /juːˈtɪlətiz/ | n | điện, nước, gas (tiện ích) | Utilities are included in the rent.
lease | /liːs/ | n | hợp đồng thuê | I signed a one-year lease.
renovate | /ˈrenəveɪt/ | v | sửa chữa, cải tạo | They plan to renovate the kitchen.
cupboard | /ˈkʌbərd/ | n | tủ đựng chén bát, đồ ăn | The cups are in the cupboard.
faucet | /ˈfɔːsɪt/ | n | vòi nước | Please turn off the faucet.
leak | /liːk/ | n | chỗ rò rỉ; (v) rò rỉ | There is a leak under the sink.
balcony | /ˈbælkəni/ | n | ban công | We have breakfast on the balcony.
basement | /ˈbeɪsmənt/ | n | tầng hầm | He keeps his bicycle in the basement.
spacious | /ˈspeɪʃəs/ | adj | rộng rãi | The living room is bright and spacious.
cramped | /kræmpt/ | adj | chật chội | Our first apartment was small and cramped.
move in | /muːv ɪn/ | v | chuyển vào ở | We move in next Saturday.
decorate | /ˈdekəreɪt/ | v | trang trí | Let's decorate the room with plants.
appliance | /əˈplaɪəns/ | n | thiết bị gia dụng | The kitchen has every modern appliance.
ventilation | /ˌventɪˈleɪʃn/ | n | sự thông gió | The bathroom has poor ventilation.
neighborhood | /ˈneɪbərhʊd/ | n | khu dân cư, khu phố | It is a friendly neighborhood with many shops.

## B2 | tech | Technology | Công nghệ
device | /dɪˈvaɪs/ | n | thiết bị | You can only sign in on one device at a time.
software | /ˈsɔːftwer/ | n | phần mềm | This software is free for students.
update | /ˌʌpˈdeɪt/ | v | cập nhật | Please update the app before you travel.
download | /ˈdaʊnloʊd/ | v | tải xuống | I need to download the file first.
password | /ˈpæswɜːrd/ | n | mật khẩu | Choose a strong password with numbers and symbols.
network | /ˈnetwɜːrk/ | n | mạng (máy tính, quan hệ) | The office network is down again.
bandwidth | /ˈbændwɪdθ/ | n | băng thông; (nghĩa bóng) năng lực xử lý | Video calls use a lot of bandwidth.
cloud storage | /klaʊd ˈstɔːrɪdʒ/ | n | lưu trữ đám mây | I keep my photos in cloud storage.
algorithm | /ˈælɡərɪðəm/ | n | thuật toán | The algorithm suggests videos based on what you watch.
artificial intelligence | /ˌɑːrtɪˈfɪʃl ɪnˈtelɪdʒəns/ | n | trí tuệ nhân tạo (AI) | Artificial intelligence can translate speech in real time.
encrypt | /ɪnˈkrɪpt/ | v | mã hóa | Apps encrypt your messages so nobody else can read them.
glitch | /ɡlɪtʃ/ | n | trục trặc nhỏ, lỗi vặt | A software glitch deleted my notes.
install | /ɪnˈstɔːl/ | v | cài đặt | It takes a minute to install the program.
wireless | /ˈwaɪərləs/ | adj | không dây | I bought wireless headphones.
gadget | /ˈɡædʒɪt/ | n | thiết bị nhỏ, đồ công nghệ | He loves buying the latest gadget.
screen time | /skriːn taɪm/ | n | thời gian nhìn màn hình | Try to limit your screen time before bed.
notification | /ˌnoʊtɪfɪˈkeɪʃn/ | n | thông báo (trên điện thoại) | I turned off every notification while studying.
backup | /ˈbækʌp/ | n | bản sao lưu | Always keep a backup of important files.
browser | /ˈbraʊzər/ | n | trình duyệt web | Which browser do you use?
breakthrough | /ˈbreɪkθruː/ | n | bước đột phá | Scientists announced a breakthrough in battery design.

## B2 | edu | Education | Giáo dục, học tập
curriculum | /kəˈrɪkjələm/ | n | chương trình giảng dạy | The school updated its curriculum this year.
assignment | /əˈsaɪnmənt/ | n | bài tập được giao | The assignment is due on Monday.
lecture | /ˈlektʃər/ | n | bài giảng | The lecture lasted two hours.
semester | /sɪˈmestər/ | n | học kỳ | I'm taking five courses this semester.
scholarship | /ˈskɑːlərʃɪp/ | n | học bổng | She won a scholarship to study abroad.
tuition | /tuˈɪʃn/ | n | học phí | Tuition goes up every year.
graduate | /ˈɡrædʒueɪt/ | v | tốt nghiệp | She will graduate in June.
major | /ˈmeɪdʒər/ | n | chuyên ngành | My major is biology.
thesis | /ˈθiːsɪs/ | n | luận văn | He is writing his thesis on urban planning.
revise | /rɪˈvaɪz/ | v | ôn tập (Anh-Anh); sửa lại | I need to revise for the exam.
cram | /kræm/ | v | học nhồi nhét | Don't cram the night before the test.
attendance | /əˈtendəns/ | n | sự có mặt, đi học đầy đủ | Attendance is checked at every class.
plagiarism | /ˈpleɪdʒərɪzəm/ | n | sự đạo văn | Plagiarism can get you expelled.
academic | /ˌækəˈdemɪk/ | adj | thuộc học thuật | Her academic results are excellent.
enroll | /ɪnˈroʊl/ | v | đăng ký nhập học | You can enroll online before the term starts.
tutor | /ˈtuːtər/ | n | gia sư | I hired a tutor to help me with math.
fluent | /ˈfluːənt/ | adj | trôi chảy, thành thạo | He is fluent in three languages.
vocabulary | /voʊˈkæbjəleri/ | n | từ vựng | Reading widely builds your vocabulary.
comprehension | /ˌkɑːmprɪˈhenʃn/ | n | khả năng hiểu, đọc hiểu | The test has a reading comprehension section.
dropout | /ˈdrɑːpaʊt/ | n | người bỏ học giữa chừng | He was a college dropout who built a company.

## B2 | emotion | Emotions & Personality | Cảm xúc, tính cách
anxious | /ˈæŋkʃəs/ | adj | lo lắng | I feel anxious before every presentation.
thrilled | /θrɪld/ | adj | vô cùng vui sướng | She was thrilled to win the prize.
furious | /ˈfjʊriəs/ | adj | giận dữ | He was furious when he saw the mess.
embarrassed | /ɪmˈbærəst/ | adj | xấu hổ, ngượng | I felt embarrassed when I forgot her name.
grateful | /ˈɡreɪtfl/ | adj | biết ơn | I'm grateful for your help.
jealous | /ˈdʒeləs/ | adj | ghen tị | Don't be jealous of other people's success.
confident | /ˈkɑːnfɪdənt/ | adj | tự tin | He sounds confident when he speaks English.
shy | /ʃaɪ/ | adj | nhút nhát, hay e thẹn | The shy boy hid behind his mother.
stubborn | /ˈstʌbərn/ | adj | bướng bỉnh | My brother is too stubborn to say sorry.
generous | /ˈdʒenərəs/ | adj | hào phóng | She is generous with her time.
reliable | /rɪˈlaɪəbl/ | adj | đáng tin cậy | He is a reliable teammate.
curious | /ˈkjʊriəs/ | adj | tò mò, ham tìm hiểu | Children are naturally curious.
optimistic | /ˌɑːptɪˈmɪstɪk/ | adj | lạc quan | I'm optimistic about the future.
frustrated | /ˈfrʌstreɪtɪd/ | adj | bực bội, nản lòng | She felt frustrated when the app kept crashing.
overwhelmed | /ˌoʊvərˈwelmd/ | adj | choáng ngợp, quá tải | I feel overwhelmed by the amount of work.
content | /kənˈtent/ | adj | hài lòng, mãn nguyện | She felt content with her simple life.
sensitive | /ˈsensətɪv/ | adj | nhạy cảm | He is sensitive to criticism.
ambitious | /æmˈbɪʃəs/ | adj | tham vọng | She is ambitious and wants to run her own firm.
patient | /ˈpeɪʃnt/ | adj | kiên nhẫn; (n) bệnh nhân | Be patient with beginners.
moody | /ˈmuːdi/ | adj | hay thay đổi tâm trạng | He gets moody when he is tired.

## B2 | nature | Nature & Environment | Thiên nhiên, môi trường
climate | /ˈklaɪmət/ | n | khí hậu | The climate here is warm and humid.
pollution | /pəˈluːʃn/ | n | ô nhiễm | Air pollution is a serious problem in big cities.
recycle | /ˌriːˈsaɪkl/ | v | tái chế | We recycle paper and plastic bottles.
renewable | /rɪˈnuːəbl/ | adj | có thể tái tạo | Solar power is a renewable energy source.
wildlife | /ˈwaɪldlaɪf/ | n | động vật hoang dã | The park protects local wildlife.
endangered | /ɪnˈdeɪndʒərd/ | adj | có nguy cơ tuyệt chủng | The tiger is an endangered species.
drought | /draʊt/ | n | hạn hán | The drought destroyed most of the crops.
flood | /flʌd/ | n | lũ lụt | The flood forced hundreds of families to leave.
habitat | /ˈhæbɪtæt/ | n | môi trường sống (của sinh vật) | Forests are the habitat of many birds.
emission | /ɪˈmɪʃn/ | n | khí thải | The city wants to cut carbon emission by half.
sustainable | /səˈsteɪnəbl/ | adj | bền vững | We try to buy sustainable products.
deforestation | /diːˌfɔːrɪˈsteɪʃn/ | n | nạn phá rừng | Deforestation threatens many animals.
ecosystem | /ˈiːkoʊsɪstəm/ | n | hệ sinh thái | A coral reef is a fragile ecosystem.
landscape | /ˈlændskeɪp/ | n | phong cảnh | The landscape changes from rice fields to mountains.
waste | /weɪst/ | n | rác thải; (v) lãng phí | Don't waste water while brushing your teeth.
conserve | /kənˈsɜːrv/ | v | bảo tồn, tiết kiệm | We must conserve energy.
global warming | /ˌɡloʊbl ˈwɔːrmɪŋ/ | n | sự nóng lên toàn cầu | Global warming is melting the ice caps.
tide | /taɪd/ | n | thủy triều | The tide comes in quickly here.
breeze | /briːz/ | n | làn gió nhẹ | A cool breeze came off the sea.
harvest | /ˈhɑːrvɪst/ | n | vụ thu hoạch; (v) thu hoạch | Farmers are busy with the rice harvest.

## B2 | phrasal | Phrasal Verbs | Cụm động từ thông dụng
give up |  | phr v | từ bỏ | Never give up on your goals.
look forward to |  | phr v | mong chờ | I look forward to the weekend.
figure out |  | phr v | tìm ra, hiểu ra | I can't figure out this puzzle.
come up with |  | phr v | nghĩ ra (ý tưởng, giải pháp) | We need to come up with a better plan.
put off |  | phr v | hoãn lại | Don't put off your homework.
carry out |  | phr v | tiến hành, thực hiện | They will carry out the survey in May.
turn down |  | phr v | từ chối; vặn nhỏ lại | She decided to turn down the offer.
run out of |  | phr v | hết, cạn (thứ gì) | We might run out of time.
get over |  | phr v | vượt qua (bệnh, nỗi buồn) | It took him a week to get over the flu.
take over |  | phr v | tiếp quản | She will take over the project next month.
bring up |  | phr v | nêu ra (chủ đề); nuôi nấng | Please don't bring up that topic again.
set up |  | phr v | thiết lập, dựng lên | Can you help me set up the projector?
work out |  | phr v | tập thể dục; giải quyết được | I try to work out three times a week.
cut down on |  | phr v | cắt giảm | I want to cut down on sugar.
catch up with |  | phr v | bắt kịp | Run ahead and I'll catch up with you.
fall behind |  | phr v | tụt lại phía sau | Don't let yourself fall behind in class.
show up |  | phr v | xuất hiện, có mặt | He didn't show up to the meeting.
back up |  | phr v | sao lưu; ủng hộ | Remember to back up your files.
break down |  | phr v | hỏng máy; suy sụp | My car might break down on the way.
keep up with |  | phr v | theo kịp | It's hard to keep up with the news.
`;
