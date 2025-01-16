export interface Artifact {
    name: string;
    status: string;
    version: string;
    buildNum: string;
    referenceNumber: string;
    buildDateTime: string;
    releases: [
      {
        releaseName: string;
        status: string;
        version: string;
        buildNum: string;
        referenceNumber: string;
        buildDateTime: string;
      }
    ];
  }
  
  