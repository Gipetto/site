# Requires Python 3
import flickr_api
import requests
import webbrowser
import argparse
import json


def load_api_keys():
    with(open('auth.json', 'r')) as j:
        creds = json.load(j)
    
    flickr_api.set_keys(
        api_key = creds['api_key'],
        api_secret = creds['api_secret']
    )

    handler = flickr_api.auth.AuthHandler(callback='oob')
    return handler


def save_oauth_token():
    with(open('oauth_token.txt', 'r')) as o:
        oauth = o.readlines()

    with(open('auth.json', 'r+')) as j:
        creds = json.load(j)

        creds['oauth_token'] = oauth[0].strip()
        creds['oauth_secret'] = oauth[1].strip()

        j.seek(0)
        json.dump(creds, j, indent=2)
        j.truncate()



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

    for attempt in range(1, 4):
        try:
            token = input('Enter the `oauth_verifier` token from the XML output (e.g. 772-751-415): ')
            verify(token.strip(), auth_handler)
            break
        except KeyboardInterrupt:
            raise SystemExit('Aborted.')
        except (requests.exceptions.HTTPError, flickr_api.FlickrError):
            print('Rejected: the code was mistyped, already used, or belongs to a different run. Re-copy it from the authorization page this run opened (attempt ' + str(attempt) + ' of 3).')
    else:
        raise SystemExit('Too many failed attempts. Re-run `make auth` to start a fresh authorization.')

    save_oauth_token()
    print('Authorization saved to oauth_token.txt and auth.json.')


if __name__ == '__main__':
    main()

