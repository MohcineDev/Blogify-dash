import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ReportedUser } from './models/ReportedUser';
import { ReportedPost } from './models/ReportedPost';
 
export const Users = [
  { username: 'John', email: 'alexander.jones@x.dummyjson.com' },
  { username: 'Sara', email: 'sara.williams@x.dummyjson.com' },
  { username: 'Mike', email: 'michael.smith@x.dummyjson.com' },
  { username: 'Anna', email: 'anna.brown@x.dummyjson.com' },
  { username: 'Tom', email: 'tom.johnson@x.dummyjson.com' },
  { username: 'Lucy', email: 'lucy.davis@x.dummyjson.com' },
  { username: 'David', email: 'david.miller@x.dummyjson.com' },
  { username: 'Emma', email: 'emma.wilson@x.dummyjson.com' }, 
  { username: 'Robert', email: 'robert.anderson@x.dummyjson.com' },
  { username: 'Sophia', email: 'sophia.thomas@x.dummyjson.com' },
  { username: 'William', email: 'william.jackson@x.dummyjson.com' },
  { username: 'Ava', email: 'ava.white@x.dummyjson.com' },
  { username: 'Daniel', email: 'daniel.harris@x.dummyjson.com' },
  { username: 'Mia', email: 'mia.martin@x.dummyjson.com' },
  { username: 'Joseph', email: 'joseph.thompson@x.dummyjson.com' },
  { username: 'Isabella', email: 'isabella.garcia@x.dummyjson.com' },
  { username: 'Charles', email: 'charles.martinez@x.dummyjson.com' },
  { username: 'Amelia', email: 'amelia.robinson@x.dummyjson.com' },
  { username: 'Henry', email: 'henry.clark@x.dummyjson.com' }
];

 const Posts = [
  { author: 'John', title: 'How to learn Angular quickly' },
  { author: 'Sara', title: 'Top 10 JavaScript tips' },
  { author: 'Mike', title: 'Understanding TypeScript types' },
  { author: 'Anna', title: 'Angular vs React: A comparison' },
  { author: 'Tom', title: 'Building a REST API with Node.js' },
  { author: 'Lucy', title: 'RxJS Observables explained' },
  { author: 'David', title: 'Unit testing in Angular' },
  { author: 'Emma', title: 'Deploying Angular apps to Firebase' },
  { author: 'James', title: 'Angular standalone components guide' },
  { author: 'Olivia', title: 'Best practices for Angular services' },
  { author: 'Robert', title: 'Introduction to NgRx' }, 
  { author: 'Daniel', title: 'Optimizing Angular performance' },
  { author: 'Mia', title: 'Creating custom Angular pipes' },
  { author: 'Joseph', title: 'Handling HTTP requests in Angular' },
  { author: 'Isabella', title: 'Using Angular Material components' },
  { author: 'Charles', title: 'Angular lifecycle hooks explained' },
  { author: 'Amelia', title: 'State management with Angular services' }
];

const reportedUsers: ReportedUser[] = [
  { reason: 'Spam content', timestamp: '2026-03-05T09:15:00Z', status: 'PENDING' },
  { reason: 'Inappropriate language', timestamp: '2026-03-04T14:30:00Z', status: 'RESOLVED' },
  { reason: 'Harassment report', timestamp: '2026-03-03T11:45:00Z', status: 'REOPENED' },
  { reason: 'Fake account', timestamp: '2026-03-02T08:20:00Z', status: 'DISMISSED' },
  { reason: 'Other', timestamp: '2026-03-01T18:00:00Z', status: 'PENDING' },
  { reason: 'Scam link', timestamp: '2026-02-28T13:05:00Z', status: 'RESOLVED' },
  { reason: 'Impersonation', timestamp: '2026-02-27T17:50:00Z', status: 'REOPENED' },
  { reason: 'Offensive username', timestamp: '2026-02-26T20:15:00Z', status: 'DISMISSED' },
  { reason: 'Phishing attempt', timestamp: '2026-02-25T09:30:00Z', status: 'PENDING' },
  { reason: 'Copyright violation', timestamp: '2026-02-24T12:45:00Z', status: 'RESOLVED' },
  { reason: 'Hate speech', timestamp: '2026-02-23T15:10:00Z', status: 'REOPENED' },
  { reason: 'Multiple accounts', timestamp: '2026-02-22T19:20:00Z', status: 'DISMISSED' },
  { reason: 'Fake news', timestamp: '2026-02-21T08:50:00Z', status: 'PENDING' },
  { reason: 'Impersonating brand', timestamp: '2026-02-18T09:40:00Z', status: 'DISMISSED' },
  { reason: 'Malware link', timestamp: '2026-02-17T16:00:00Z', status: 'PENDING' }, 
];

const reportedPosts: ReportedPost[] = [
  { reason: 'Spam content', timestamp: '2026-03-05T09:15:00Z', status: 'PENDING' },
  { reason: 'Offensive media', timestamp: '2026-03-04T14:30:00Z', status: 'RESOLVED' },
  { reason: 'Hate speech', timestamp: '2026-03-03T11:45:00Z', status: 'REOPENED' },
  { reason: 'Fake news', timestamp: '2026-03-02T08:20:00Z', status: 'DISMISSED' },
  { reason: 'Inappropriate link', timestamp: '2026-03-01T18:00:00Z', status: 'PENDING' },
  { reason: 'Scam content', timestamp: '2026-02-28T13:05:00Z', status: 'RESOLVED' },
  { reason: 'Copyright violation', timestamp: '2026-02-27T17:50:00Z', status: 'REOPENED' },
  { reason: 'Harassment', timestamp: '2026-02-26T20:15:00Z', status: 'DISMISSED' },
  { reason: 'Fake account', timestamp: '2026-02-25T09:30:00Z', status: 'PENDING' },
  { reason: 'Offensive comment', timestamp: '2026-02-24T12:45:00Z', status: 'RESOLVED' },
  { reason: 'Impersonation', timestamp: '2026-02-23T15:10:00Z', status: 'REOPENED' },
  { reason: 'Malware link', timestamp: '2026-02-22T19:20:00Z', status: 'DISMISSED' },
  { reason: 'Abusive language', timestamp: '2026-02-21T08:50:00Z', status: 'PENDING' },
  { reason: 'Fake review', timestamp: '2026-02-20T14:30:00Z', status: 'RESOLVED' },
  { reason: 'Spam post', timestamp: '2026-02-19T11:25:00Z', status: 'REOPENED' },
  { reason: 'Unauthorized content', timestamp: '2026-02-18T09:40:00Z', status: 'DISMISSED' },
  { reason: 'Phishing attempt', timestamp: '2026-02-17T16:00:00Z', status: 'PENDING' },
  { reason: 'Off-topic post', timestamp: '2026-02-16T13:35:00Z', status: 'RESOLVED' },
  { reason: 'Impersonating brand', timestamp: '2026-02-15T10:50:00Z', status: 'REOPENED' },
  { reason: 'Fake advertisement', timestamp: '2026-02-14T18:15:00Z', status: 'DISMISSED' },
];

export const FakeBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const url = new URL(req.url, 'http://localhost'); // parse query params
  const status = url.searchParams.get('status');

  if (req.url.startsWith('api/ReportedUser') && req.method === 'GET') {
    const filtered = status ? reportedUsers.filter(u => u.status === status) : Users;
    return of(new HttpResponse({ status: 200, body: filtered })).pipe(delay(500));
  }

  //  /api/posts
  if (req.url.startsWith('api/reportedPosts') && req.method === 'GET') {
    const filtered = status ? reportedPosts.filter(p => p.status === status) : reportedPosts;
    return of(new HttpResponse({ status: 200, body: filtered })).pipe(delay(500));
  }

   if (req.url.startsWith('api/users') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: Users })).pipe(delay(500));
  }
   if (req.url.startsWith('api/posts') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: Posts })).pipe(delay(500));
  }
  if (req.url.startsWith('api/total') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: {users : Users.length, posts: Posts.length, 
      reportedPosts : reportedPosts.length, reportedUsers: reportedUsers.length} })).pipe(delay(500));
  }

  return next(req);
};
