from mailjet_rest import Client
import os
api_key = 'c686c06655f3e6112b183dfa8c8bbb98'
api_secret = '798f71c5eab4b17cdca141e0db691cf0'
mailjet = Client(auth=(api_key, api_secret), version='v3.1')
data = {
  'Messages': [
    {
      "From": {
        "Email": "sobik@heavylite.com",
        "Name": "Sobik"
      },
      "To": [
        {
          "Email": "edantuti@gmail.com",
          "Name": "Sobik"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
}
result = mailjet.send.create(data=data)
print(result.status_code)
print(result.json())
