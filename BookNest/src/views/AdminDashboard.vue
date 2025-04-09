<template>
  <div class="admin-container">
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h1 class="sidebar-logo">BookNest Admin</h1>
        </div>
        <div class="sidebar-content">
          <nav class="sidebar-nav">
            <a href="#" class="nav-item active">
              <span class="nav-icon dashboard-icon"></span>
              Dashboard
            </a>
            <a href="#" class="nav-item">
              <span class="nav-icon books-icon"></span>
              Books
            </a>
            <a href="#" class="nav-item">
              <span class="nav-icon users-icon"></span>
              Users
            </a>
            <a href="#" class="nav-item">
              <span class="nav-icon borrowing-icon"></span>
              Borrowing
            </a>
            <a href="#" class="nav-item">
              <span class="nav-icon settings-icon"></span>
              Settings
            </a>
          </nav>
        </div>
        <div class="sidebar-footer">
          <div class="user-info">
            <img class="user-avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Admin user">
            <div class="user-details">
              <p class="user-name">Admin User</p>
              <p class="user-email">admin@booknest.com</p>
            </div>
          </div>
          <button class="logout-button">
            <span class="logout-icon"></span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Top Navigation -->
        <header class="top-nav">
          <button class="menu-toggle">
            <span class="menu-icon"></span>
          </button>
          <h1 class="mobile-logo">BookNest Admin</h1>
          <div class="nav-actions">
            <button class="notification-button">
              <span class="notification-icon"></span>
              <span class="notification-badge"></span>
            </button>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="content-area">
          <div class="content-wrapper">
            <!-- Page Header -->
            <div class="page-header">
              <h2 class="page-title">Dashboard</h2>
              <div class="page-actions">
                <button class="btn-secondary">Print Report</button>
                <button class="btn-primary">Export Data</button>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="stats-grid">
              <!-- Total Books -->
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon books-stat-icon"></div>
                  <div class="stat-info">
                    <h3 class="stat-label">Total Books</h3>
                    <p class="stat-value">{{ stats.totalBooks }}</p>
                  </div>
                </div>
                <div class="stat-footer">
                  <a href="#" class="stat-link">View all books</a>
                </div>
              </div>

              <!-- Active Users -->
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon users-stat-icon"></div>
                  <div class="stat-info">
                    <h3 class="stat-label">Active Users</h3>
                    <p class="stat-value">{{ stats.activeUsers }}</p>
                  </div>
                </div>
                <div class="stat-footer">
                  <a href="#" class="stat-link">View all users</a>
                </div>
              </div>

              <!-- Books Borrowed -->
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon borrowed-stat-icon"></div>
                  <div class="stat-info">
                    <h3 class="stat-label">Books Borrowed</h3>
                    <p class="stat-value">{{ stats.booksBorrowed }}</p>
                  </div>
                </div>
                <div class="stat-footer">
                  <a href="#" class="stat-link">View all borrowings</a>
                </div>
              </div>

              <!-- Overdue Books -->
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon overdue-stat-icon"></div>
                  <div class="stat-info">
                    <h3 class="stat-label">Overdue Books</h3>
                    <p class="stat-value">{{ stats.overdueBooks }}</p>
                  </div>
                </div>
                <div class="stat-footer">
                  <a href="#" class="stat-link">View overdue books</a>
                </div>
              </div>
            </div>

            <!-- Recent Activity and Books Management -->
            <div class="dashboard-grid">
              <!-- Recent Activity -->
              <div class="dashboard-card">
                <div class="card-header">
                  <h3 class="card-title">Recent Activity</h3>
                </div>
                <div class="card-content">
                  <ul class="activity-list">
                    <li v-for="(activity, index) in recentActivity" :key="activity.id" class="activity-item">
                      <div class="activity-timeline">
                        <div class="activity-icon" :class="activity.iconClass"></div>
                        <div v-if="index !== recentActivity.length - 1" class="timeline-line"></div>
                      </div>
                      <div class="activity-details">
                        <p class="activity-text">
                          {{ activity.content }}
                          <a :href="activity.href" class="activity-link">{{ activity.target }}</a>
                        </p>
                        <time class="activity-time" :datetime="activity.datetime">{{ activity.date }}</time>
                      </div>
                    </li>
                  </ul>
                  <div class="card-action">
                    <a href="#" class="btn-text">View all activity</a>
                  </div>
                </div>
              </div>

              <!-- Books Management -->
              <div class="dashboard-card">
                <div class="card-header">
                  <h3 class="card-title">Books Management</h3>
                  <button class="btn-small">Add Book</button>
                </div>
                <div class="card-content">
                  <div class="table-container">
                    <table class="data-table">
                      <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="book in recentBooks" :key="book.id">
                        <td>
                          <div class="book-cell">
                            <img class="book-thumbnail" :src="book.coverImage" :alt="book.title">
                            <span class="book-title">{{ book.title }}</span>
                          </div>
                        </td>
                        <td>{{ book.author }}</td>
                        <td>
                              <span class="status-badge" :class="book.isAvailable ? 'status-available' : 'status-borrowed'">
                                {{ book.isAvailable ? 'Available' : 'Borrowed' }}
                              </span>
                        </td>
                        <td>
                          <div class="action-buttons">
                            <a href="#" class="action-edit">Edit</a>
                            <a href="#" class="action-delete">Delete</a>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="card-action">
                    <a href="#" class="btn-text">Manage all books</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Management -->
            <div class="dashboard-card full-width">
              <div class="card-header">
                <h3 class="card-title">User Management</h3>
                <button class="btn-small">Add User</button>
              </div>
              <div class="card-content">
                <div class="table-container">
                  <table class="data-table">
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Books Borrowed</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in recentUsers" :key="user.id">
                      <td>
                        <div class="user-cell">
                          <img class="user-thumbnail" :src="user.avatar" :alt="user.name">
                          <span class="user-name">{{ user.name }}</span>
                        </div>
                      </td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.booksBorrowed }}</td>
                      <td>
                            <span class="status-badge" :class="user.status === 'Active' ? 'status-active' : 'status-inactive'">
                              {{ user.status }}
                            </span>
                      </td>
                      <td>
                        <div class="action-buttons">
                          <a href="#" class="action-edit">Edit</a>
                          <a href="#" class="action-delete">{{ user.status === 'Active' ? 'Deactivate' : 'Activate' }}</a>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-action">
                  <a href="#" class="btn-text">Manage all users</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dashboard statistics
const stats = ref({
  totalBooks: 2547,
  activeUsers: 1283,
  booksBorrowed: 428,
  overdueBooks: 23
});

// Recent activity data
const recentActivity = ref([
  {
    id: 1,
    content: 'New user registered: ',
    target: 'Sarah Johnson',
    href: '#',
    date: 'Just now',
    datetime: '2023-01-23T13:45:00',
    iconClass: 'icon-user-add'
  },
  {
    id: 2,
    content: 'Book borrowed: ',
    target: 'The Midnight Library',
    href: '#',
    date: '2 hours ago',
    datetime: '2023-01-23T11:30:00',
    iconClass: 'icon-book-borrow'
  },
  {
    id: 3,
    content: 'Book returned: ',
    target: 'Project Hail Mary',
    href: '#',
    date: '5 hours ago',
    datetime: '2023-01-23T08:15:00',
    iconClass: 'icon-book-return'
  },
  {
    id: 4,
    content: 'New book added: ',
    target: 'The Four Winds',
    href: '#',
    date: 'Yesterday',
    datetime: '2023-01-22T14:20:00',
    iconClass: 'icon-book-add'
  },
  {
    id: 5,
    content: 'Overdue notice sent to ',
    target: 'Michael Chen',
    href: '#',
    date: '2 days ago',
    datetime: '2023-01-21T09:30:00',
    iconClass: 'icon-notification'
  }
]);

// Recent books data
const recentBooks = ref([
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAvailable: false
  },
  {
    id: 2,
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },
  {
    id: 3,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },
  {
    id: 4,
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAvailable: false
  }
]);

// Recent users data
const recentUsers = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    booksBorrowed: 2,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    booksBorrowed: 1,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    booksBorrowed: 3,
    status: 'Active'
  },
  {
    id: 4,
    name: 'James Rodriguez',
    email: 'james.rodriguez@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    booksBorrowed: 0,
    status: 'Inactive'
  }
]);
</script>

<style scoped>
/* Base Styles */
.admin-container {
  min-height: 100vh;
  background-color: #f3f4f6;
}

.admin-layout {
  display: flex;
  height: 100vh;
}

/* Sidebar Styles */
.sidebar {
  display: none;
  flex-direction: column;
  width: 16rem;
  background-color: #92400e;
  color: white;
  border-right: 1px solid #78350f;
}

@media (min-width: 768px) {
  .sidebar {
    display: flex;
  }
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  padding: 0 1rem;
  background-color: #78350f;
}

.sidebar-logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.sidebar-nav {
  padding: 1rem 0.5rem;
  background-color: #92400e; /* optional, reinforces brown background */
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.25rem;
  color: white; /* changed */
  text-decoration: none;
  background-color: #92400e; /* added */
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #78350f; /* darker brown */
}

.nav-item.active {
  background-color: #b45309;
  color: white;
  font-weight: 500;
}

.nav-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
  background-color: #fbbf24;
  mask-size: cover;
  -webkit-mask-size: cover;
}

.dashboard-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'/%3E%3C/svg%3E");
}

.books-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/%3E%3C/svg%3E");
}

.users-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
}

.borrowing-icon {
  background-color: #fbbf24;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

.settings-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'/%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'/%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/%3E%3C/svg%3E");
}

.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid #78350f;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
}

.user-email {
  font-size: 0.75rem;
  color: #fbbf24;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  color: #fbbf24;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #fbbf24;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Top Navigation */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 1rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }
}

.menu-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #6b7280;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

.mobile-logo {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

@media (min-width: 768px) {
  .mobile-logo {
    display: none;
  }
}

.nav-actions {
  display: flex;
  align-items: center;
}

.notification-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.notification-button:hover {
  background-color: #f3f4f6;
}

.notification-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #6b7280;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

.notification-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #ef4444;
  border-radius: 9999px;
}

/* Content Area */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  .content-area {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .content-area {
    padding: 2rem;
  }
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

@media (min-width: 640px) {
  .page-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .page-title {
    font-size: 2.25rem;
  }
}

.page-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-primary {
  padding: 0.5rem 1rem;
  background-color: #d97706;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #b45309;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  background-color: white;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #f9fafb;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.stat-content {
  display: flex;
  align-items: center;
  padding: 1.25rem;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  margin-right: 1.25rem;
}

.books-stat-icon {
  background-color: #fef3c7;
  position: relative;
}

.books-stat-icon::before {
  content: "";
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #d97706;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

.users-stat-icon {
  background-color: #d1fae5;
  position: relative;
}

.users-stat-icon::before {
  content: "";
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #059669;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

.borrowed-stat-icon {
  background-color: #dbeafe;
  position: relative;
}

.borrowed-stat-icon::before {
  content: "";
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #3b82f6;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

.overdue-stat-icon {
  background-color: #fee2e2;
  position: relative;
}

.overdue-stat-icon::before {
  content: "";
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ef4444;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.stat-footer {
  padding: 1rem;
  background-color: #f9fafb;
  border-top: 1px solid #f3f4f6;
}

.stat-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #d97706;
  text-decoration: none;
}

.stat-link:hover {
  color: #b45309;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.dashboard-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.full-width {
  grid-column: 1 / -1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid #f3f4f6;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.btn-small {
  padding: 0.375rem 0.75rem;
  background-color: #d97706;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.btn-small:hover {
  background-color: #b45309;
}

.card-content {
  padding: 1.25rem;
}

/* Activity List */
.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  margin-bottom: 2rem;
}

.activity-item:last-child {
  margin-bottom: 0;
}

.activity-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  position: relative;
}

.activity-icon::before {
  content: "";
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  mask-size: cover;
  -webkit-mask-size: cover;
}

.icon-user-add {
  background-color: #10b981;
}

.icon-user-add::before {
  background-color: white;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'/%3E%3C/svg%3E");
}

.icon-book-borrow {
  background-color: #3b82f6;
}

.icon-book-borrow::before {
  background-color: white;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/%3E%3C/svg%3E");
}
</style>