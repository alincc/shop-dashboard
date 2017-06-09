import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTI4NmEyZDhmOTU2ODBiOWJjMGJjMDUiLCJ1cGRhdGVkQXQiOiIyMDE3LTA1LTI2VDE3OjQ3OjI1Ljk2OFoiLCJjcmVhdGVkQXQiOiIyMDE3LTA1LTI2VDE3OjQ3OjI1Ljk2OFoiLCJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwicGFzc3dvcmQiOiJkb2UiLCJ1c2VybmFtZSI6ImpvaG4iLCJfX3YiOjAsImFkbWluIjpmYWxzZSwiaWF0IjoxNDk1ODIxMjY3fQ.3_LmI7i1YdD1BhvpOA59XKRPBSv57JiWEQyr8NgUuzc';

export function fakeBackEndFactory(backend: MockBackend, options: BaseRequestOptions) {
  backend.connections.subscribe((connection: MockConnection) => {

    if (connection.request.url.endsWith('/api/auth') && connection.request.method === RequestMethod.Post) {
      let params = JSON.parse(connection.request.getBody());

      if (params.email === "johndoe@email.com" && params.password === "doe") {
        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200, body: { token: mockToken } })
        ))
      }
      else {
        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200 })
        ));
      }
    }

  })

  return new Http(backend, options);
}

export let fakeBackEndProvider = {
  provide: Http,
  useFactory: fakeBackEndFactory,
  deps: [MockBackend, BaseRequestOptions],
};
