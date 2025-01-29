export interface Deployment {
    id: number;
    jobName: string;
    releaseName: string;
    parameters: any;
    status: string;
    buildNumber: number;
    triggeredBy: string;
    createdAt: string;
    updatedAt: string;
  }