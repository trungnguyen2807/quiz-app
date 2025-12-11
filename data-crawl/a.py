import requests
from bs4 import BeautifulSoup

url = "https://www.wanderlustmagazine.com/quiz/vietnam-quiz/"

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# Tìm thẻ có class "wak-questions no-correct-answers"
questions_temp = soup.find_all(class_="wak-quesiton-title wak-quiz-headings-question-text")
answers_temp = soup.find_all(class_="wak-answer-text wak-quiz-headings-answer-text")


questions = ['Which city is the capital of Vietnam?', 'In Vietmanese cuisine, what is a bánh mì closest to?', 'Phong Nha National Park is home to the world’s largest what?', 'In which mountainous town does the Love Market traditionally take place?', 'What is the unusual ingredient you’ll find in Cà phê trứng coffee?', 'Where will you find the UNESCO-listed Purple Forbidden City?', 'What currency is used in Vietnam?', 'In what year did Halong Bay become inscribed by UNESCO?', 'Ho Chi Minh city was renamed after the revolutionary leader who fought for Vietnamese independence. But what was it called before 1975?', 'What species of monkey can you expect to see at Cat Tien National Park?', 'The Vietnamese celebrate their New Year in mid-January to mid-February, depending on the lunar calendar. What do they call it?', 'Vietnam is the third-largest exporter of what?', 'How many stars are on the Vietnamese flag?', 'In which province will you find the Tràng An Scenic Landscape Complex?', 'What is the name of the train that runs from north to south Vietnam?', 'True of false. In Vietnam, there’s one motorbike for every two people?']
answers = ['Ho Chi Minh', 'Hanoi', 'Hue', 'Da Nang', 'Stirfry', 'Soup', 'Stew', 'Sandwich', 'Tree', 'Lagoon', 'Pinnacle formation', 'Cave', 'Sapa', 'Mai Chau', 'Pleiku', 'Cat Cat', 'Cheese', 'Egg', 'Chilli', 'Rice', 'Dalat', 'Vinh', 'Hue', 'Mỹ Tho', 'Dong', 'Ding', 'Dang', 'Sung', '1986', '1990', '1994', '1998', 'Saigon', 'Ly Thai To', 'Thành phố', 'Faifo', 'Saki', 'Howler', 'Macaque', 'Gibbons', 'Tết', 'Lim', 'Xến Xó Phốn', 'Oóc Om Bóc', 'Cocoa', 'Rice', 'Coffee', 'Olive oil', 'One', 'Two', 'Three', 'Four', 'Lam Dong', 'Dak Lak', 'Dong Nai', 'Nimh Binh', 'Independence Express', 'Red and Yellow Express', 'Reunification Express', 'Starlight Express', 'True', 'False']

for el in questions_temp:
    questions.append(f"{el.get_text(strip=True)}")
for el in answers_temp:
    answers.append(f"{el.get_text(strip=True)}")
