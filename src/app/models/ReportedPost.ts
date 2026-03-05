export interface ReportedPost {
  reason: string;
  timestamp: string; 
  status: 'PENDING' | 'RESOLVED' | 'REOPENED' | 'DISMISSED';
}