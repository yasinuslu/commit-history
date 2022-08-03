export interface Commit {
  author: CommitAuthor;
  message: string;
  url: string;
}

export interface CommitAuthor {
  name?: string;
  email?: string;
  date?: string;
}
