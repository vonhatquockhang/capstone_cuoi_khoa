export interface Job {
  id: string;
  name: string;
}

export interface JobDetail {
  id: string;
  image: string;
  job?: Job;
}
