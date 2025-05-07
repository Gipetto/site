# Requires Python 3
import flickr_api
import webbrowser
import argparse
import json
import sys


def load_api_keys():
    with(open('auth.json', 'r')) as j:
        creds = json.load(j)
    j.close()
    
    flickr_api.set_keys(
        api_key = creds.api_key,
        api_secret = creds.api_secret
    )

    handler = flickr_api.auth.AuthHandler()
    return handler


def save_oauth_token():
    with(open('oauth_token.txt', 'r')) as o:
        oauth = o.readlines()
    o.close()

    with(open('auth.json', 'r+')) as j:
        creds = json.load(j)

        creds['oauth_token'] = oauth[0].strip()
        creds['oauth_secret'] = oauth[1].strip()

        j.seek(0)
        json.dump(creds, j, indent=2)
        j.truncate()

    j.close()



def auth(auth_handler):
    perms = 'read'
    url = auth_handler.get_authorization_url(perms)
    webbrowser.open_new_tab(url)


def verify(token, auth_handler):
    auth_handler.set_verifier(token)
    flickr_api.set_auth_handler(auth_handler)
    auth_handler.save('oauth_token.txt')


def main():
    auth_handler = load_api_keys()
    auth(auth_handler)
    token = input('Enter the `oauth_verifier` token from the XML output: ')
    verify(token.strip(), auth_handler)
    save_oauth_token()


if __name__ == '__main__':
    main()

