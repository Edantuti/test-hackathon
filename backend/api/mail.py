from mailjet_rest import Client

api_key = 'c686c06655f3e6112b183dfa8c8bbb98'
api_secret = '798f71c5eab4b17cdca141e0db691cf0'

mailjet = Client(auth=(api_key, api_secret), version='v3.1')

def send_mail(receiver_email, receiver_name, verification_code):
    data = {
        'Messages':[
            {
                "From":{
                    "Email":"sobik@heavylite.com",
                    "Name":"Decoy"
                },
                "To":[
                    {
                        "Email":receiver_email,
                        "Name":receiver_name
                    }
                ],
                "Subject":"Verification link",
                "HTMLPart":f"<h1>Verfication Link</h1><p>The verification link <a href={verification_code}>link</a>",
                "CustomID":"AppGettingStartedTest",
            }
        ]
    }
    return mailjet.send.create(data=data).json()