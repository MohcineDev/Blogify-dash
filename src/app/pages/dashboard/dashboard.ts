import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Router, RouterLink } from '@angular/router';
// import { toast } from '../../Components/toast/toast'
import { confirmAction } from '../../Components/confirm-action/confirm-action'
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../services/ToastService';
import { ReportedUser } from '../../models/ReportedUser';


interface adminAction {
  type: 'HIDE' | 'BAN' | 'UNBAN' | 'DELETE_POST' | 'DELETE_USER' | 'DISMISS' | 'DISMISS_USER' | 'DISMISS_POST' | 'UNHIDE',
  reportedId: number, // user or post
  message: string,
} 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, confirmAction],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})


export class Dashboard implements OnInit {

  constructor(private http: HttpClient, private toast: ToastService, 
    private router: Router, private dialog: MatDialog) { }

  baseUrl = environment.apiUrl
  users: any[] = []
  posts: any[] = []
  reportedUsers: any[] = []
  reportedPosts: any[] = []
  adminaction: adminAction | null = null
  action_msg: string = ''
  activeBtn: string = ''

  totalCounts = {
    users: 0,
    posts: 0,
    reportedUsers: 0,
    reportedPosts: 0
  }

  loading = true
  message = ''
  toDisplay = localStorage.getItem('toDisplay') || 'users'
 


  dialogConfig = {
    title: '',
    content: ''
  }

  displayPosts() {
    localStorage.setItem('toDisplay', 'posts')
    this.toDisplay = 'posts'
    this.getPosts()
  }

  displayUsers() {
    localStorage.setItem('toDisplay', 'users')
    this.toDisplay = 'users'
    this.getUsers()
  }

  displayReportedUsers() {
    localStorage.setItem('toDisplay', 'reported users')
    this.toDisplay = 'reported users'
    this.getPendingReportedUsers()
  }

  displayReportedPosts() {
    localStorage.setItem('toDisplay', 'reported posts')
    this.toDisplay = 'reported posts'
    this.getPendingReportedPosts()
  }

  ngOnInit() {
 

    this.loadStatsData()
    if (this.toDisplay === 'users') this.displayUsers()
    if (this.toDisplay === 'posts') this.displayPosts()
    if (this.toDisplay === 'reported users') this.displayReportedUsers()
    if (this.toDisplay === 'reported posts') this.displayReportedPosts()
  }

  hideLoadBtn: boolean = false
  hideLessBtn: boolean = false
 


  getUsers() {
    this.loading = true
    this.http.get(`api/users`).subscribe({
      next: (data: any) => {
        this.users = data

        this.loading = false

      },
      error: (err) => {
        this.loading = false
        this.users = []

      }
    })
  }

 
  getPosts() {
    // this.http.get(`${this.baseUrl}/admin/posts`).subscribe({
    this.http.get(`api/posts`).subscribe({
      next: (data: any) => {
        this.posts = data
        this.loading = false

      },
      error: (err) => {
        this.loading = false
      }
    })
  }

  ///*--------- POSTS FILTER
  postsFilter(url: string) {
    this.loading = true
    this.http.get(`api/reportedPosts?status=${url}`).subscribe({
      next: (data: any) => {
        this.reportedPosts = data
        this.loading = false
      },
      error: (err) => this.loading = false
    })
  }

  getPendingReportedPosts() {
    this.activeBtn = 'pending'
    this.postsFilter('PENDING')
  }

  getResolvedReportedPosts() {
    this.activeBtn = 'resolved'
    this.postsFilter('RESOLVED')
  }
  getReopenedReportedPosts() {
    this.activeBtn = 'reopened'
    this.postsFilter('REOPENED')
  }

  getDismissedReportedPosts() {
    this.activeBtn = 'dismissed'
    this.postsFilter('DISMISSED')
  }

  ///*--------- USERS FILTER
  usersFilter(status: string) {
    this.loading = true
    this.http.get<ReportedUser[]>(`api/ReportedUser?status=${status}`).subscribe({
      next: (data: any) => {

        this.reportedUsers = data//.filter((u: ReportedUser) => u.status === status);
        this.loading = false
      },
      error: () => this.loading = false
    })
  }
  getPendingReportedUsers() {
    this.activeBtn = 'pending'
    this.usersFilter('PENDING')
  }
  getResolvedReportedUsers() {
    this.activeBtn = 'resolved'
    this.usersFilter('RESOLVED')
  }
  getReopenedReportedUsers() {
    this.activeBtn = 'reopened'
    this.usersFilter('REOPENED')
  }
  getDismissedReportedUsers() {
    this.activeBtn = 'dismissed'
    this.usersFilter('DISMISSED')
  }
  //***------ diplsay reason in a popup
  openToRead(reason: string) {
    this.toast.show(reason, 'reason')
  }

  loadStatsData() {
    this.http.get(`api/total`).subscribe({
      next: (data: any) => {
        this.totalCounts = {
          users: data.users,
          posts: data.posts,
          reportedUsers: data.reportedUsers,
          reportedPosts: data.reportedPosts,
        }

      },
      error: (err) => {

      }
    })
    this.loading = false
  }

  // ACTIONS 
  //#### unhide Post 
  prepareUnhidePost(id: number) {
    this.adminaction = {
      type: 'UNHIDE',
      message: 'do you  want to unhide this post!!!',
      reportedId: id
    }
    this.action_msg = this.adminaction.message
  }
  //#### hide post  
  prepareHidePost(id: number) {
    this.adminaction = {
      type: 'HIDE',
      message: 'do you  want to hide this post!!!',
      reportedId: id
    }
    this.action_msg = this.adminaction.message
  }

  preparePostDissmisReport(id: number) {
    this.adminaction = {
      type: 'DISMISS_POST',
      message: 'do you want to dismiss this report!!',
      reportedId: id
    }
    this.action_msg = this.adminaction.message
  }

  prepareUserDissmisReport(id: number) {
    this.adminaction = {
      type: 'DISMISS_USER',
      message: 'do you want to dismiss this report!!',
      reportedId: id
    }
    this.action_msg = this.adminaction.message
  }

  prepareDeletePost(id: number) {
    this.adminaction = {
      type: 'DELETE_POST',
      message: 'delete this post!!!',
      reportedId: id
    }
    this.action_msg = this.adminaction.message
  }

  //------------------ USER

  prepareBanUser(userId: number) {
    this.adminaction = {
      type: 'BAN',
      message: 'ban this user',
      reportedId: userId
    }
    this.action_msg = this.adminaction.message
  }

  prepareUnbanUser(userId: number) {
    this.adminaction = {
      type: 'UNBAN',
      message: 'unban this user',
      reportedId: userId
    }
    this.action_msg = this.adminaction.message
  }

  prepareDeleteuser(userId: number) {
    this.adminaction = {
      type: 'DELETE_USER',
      message: 'delete this user!!!',
      reportedId: userId
    }
    this.action_msg = this.adminaction.message
  }

  cancelAction() {
    this.action_msg = ''
    this.adminaction = null
  }

  refreshTable(): void {
    switch (this.toDisplay) {
      case 'users':
        this.getUsers()
        break;
      case 'posts':
        this.getPosts()
        break;
      case 'reported posts':
        switch (this.activeBtn) {
          case 'pending':
            this.getPendingReportedPosts()
            break;
          case 'resolved':
            this.getResolvedReportedPosts()
            break;
          case 'reopened':
            this.getReopenedReportedPosts()
            break;
          case 'dismissed':
            this.getDismissedReportedPosts()
            break;
        }
        break;
      case 'reported users':
        switch (this.activeBtn) {
          case 'pending':
            this.getPendingReportedUsers()
            break;
          case 'resolved':
            this.getResolvedReportedUsers()
            break;
          case 'reopened':
            this.getReopenedReportedUsers()
            break;
          case 'dismissed':
            this.getDismissedReportedUsers()
            break;
        }
        break;
      default:
    }
  }

  confirmAction(): void {
    if (!this.adminaction) {
      this.cancelAction()
      return
    }
    this.loading = true
    const action = this.adminaction

    switch (action.type) {
      // case 'HIDE':
      // case 'UNHIDE':

      //   this.http.put(`${this.baseUrl}/admin/post/${action.type.toLowerCase()}/${action.reportedId}`, {}).subscribe({
      //     next: (res) => {
      //       this.refreshTable()
      //     },
      //     error: (err) => { }
      //   })
      //   break;

      // case 'DELETE_POST':
      //   this.http.delete(`${this.baseUrl}/admin/post/${action.reportedId}`).subscribe({
      //     next: (res) => {
      //       this.loadStatsData()
      //       this.refreshTable()
      //     },
      //     error: (err) => {
      //       console.log(err)
      //     }
      //   })
      //   break;
      // case 'DISMISS_POST':
      //   this.http.put(`${this.baseUrl}/admin/post/dismiss/${action.reportedId}`, {}).subscribe({
      //     next: (res) => this.refreshTable(),
      //     error: (err) => console.log(err),
      //   })
      //   break;
      // case 'DELETE_USER':
      //   this.http.delete(`${this.baseUrl}/admin/user/${action.reportedId}`).subscribe({
      //     next: (res) => {
      //       this.loadStatsData()
      //       this.refreshTable()
      //     },
      //     error: (err) => {
      //       this.toast.show(err.error.detail, 'alert')
      //     },
      //   })
      //   break;
      // case 'DISMISS_USER':
      //   this.http.put(`${this.baseUrl}/admin/user/dismiss/${action.reportedId}`, {}).subscribe({
      //     next: () => this.refreshTable(),
      //     error: (err) => {

      //       console.log(err)
      //     },
      //   })
      //   break;
      // case 'BAN':
      // case 'UNBAN':
      //   this.http.put(`${this.baseUrl}/admin/user/${action.type.toLowerCase()}/${action.reportedId}`, {}).subscribe({
      //     next: (res) => {
      //       this.refreshTable()
      //     },
      //     error: (err) => {
      //       console.log(err);

      //       this.toast.show(err.error.detail, 'alert')

      //     },
      //   })
      //   break;
      default:
        this.cancelAction()
        break;
    }

    this.loading = false
    this.action_msg = ''
  }
  logout() {

    this.action_msg = ''
    this.router.navigate(['/login'])
  }
  // manage aside

  hideaside: boolean = false
}
