rem Microservices
start cmd /c "cd microservices/happiness/ && .\env\Scripts\activate.bat && python app.py /s && pause"
start cmd /c "cd microservices/reminder/ && .\env\Scripts\activate.bat && python app.py /s && pause"

rem Dashboard
start cmd /c ".\env\Scripts\activate.bat && python app.py /s && pause"

rem Browser
"C:\Users\Julle\AppData\Local\Google\Chrome\Application\chrome.exe" --incognito http://localhost:8080/
