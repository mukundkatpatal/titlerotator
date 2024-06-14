
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PostService } from './api.service';
import { IPost } from '@titlerotator/models';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService, provideHttpClientTesting()]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts', () => {
    const dummyPosts: IPost[] = [
      { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });


  it('should handle error response', () => {
    const errorMessage = 'Server returned code: 404, error message is: Not Found';

    service.getPosts().subscribe(
      () => fail('expected an error, not posts'),
      (error) => expect(error).toEqual(errorMessage)
    );

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    expect(request.request.method).toBe('GET');

    request.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
