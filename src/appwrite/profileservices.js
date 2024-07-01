
import conf from "../conf/config";
import { Client, ID, Databases, Storage } from "appwrite";

class ProfileServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteurl).setProject(conf.projectid);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createProfile({
    UserId,
    name,
    slug,
    locaton,
    phone,
    isres,
    imageid,
    state="InitiationPhase",
    type,
    longitude,
    latitude
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          name,
          locaton,
          phone,
          UserId,
          isres,
          imageid,
          state,
          type,
          longitude,
          latitude
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createProfile :: error", error);
      throw error;
    }
  }
  async createuserProfile({
    UserId,
    name,
    slug,
    locaton,
    phone,
    isres,
    imageid,
    state="completed"
    ,
    longitude,
    latitude
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseid,
        conf.collectionid2,
        slug,
        {
          name,
          locaton,
          phone,
          UserId,
          isres,
          imageid,
          state,
    longitude,
    latitude
          
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createProfile :: error", error);
      throw error;
    }
  }
  async updateuserProfile({
    UserId,
    name,
    slug,
    locaton,
    phone,
    isres,
    imageid,
    state,
    longitude,
    latitude

  }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid2,
        slug,
        {
          name,
          locaton,
          phone,
          UserId,
          isres,
          imageid,
          state,
          longitude,
          latitude
          
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createProfile :: error", error);
      throw error;
    }
  }

  async updateprofile({
    UserId,
    name,
    slug,
    locaton,
    phone,
    isres,
    imageid,
    state,
    type,
    longitude,
    latitude
  }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          name,
          locaton,
          phone,
          UserId,
          isres,
          imageid,
          state,
          type,
          longitude,
          latitude
          
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createProfile :: error", error);
      throw error;
    }
  }

  async createroomdetails(
   
    {  slug, roomdetaisl, state="createdroom"}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        
        {
            roomdetaisl,
            state
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createroomdetails :: error", error);
      throw error;
    }
  }
  async updateroomdetails(
   
    {  slug, roomdetaisl,state }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,

        
        {
            roomdetaisl,
            state
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
  async updategropimges(
   
    {  slug, gropimg ,state}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,

        {
          gropimg,
          state
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
  async updatetimings(
   
    {  slug, opentime,closetime, startinterval,closeinterval,state,slots}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          opentime,
          closetime,
          startinterval,
          closeinterval,
          state,
          slots
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
  async updatebankdetails(
   
    {  slug, bankdetails}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          bankdetails
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
  async updatestatus(
   
    {  slug, isopen}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          isopen
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
   
    async updatesaved({ slug, saved }) {
      try {
        return await this.databases.updateDocument(
          conf.databaseid,
          conf.collectionid2,
          slug,
          { saved }
        );
      } catch (error) {
        console.log('Appwrite service ::  :: error', error);
        throw error;
      }
    
  };
  async updatefoodmenue(
   
    {  slug, foodmenue}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          foodmenue
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
  async updatereservations(
   
    {  slug, reservation}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          reservation
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
  async updateratings(
   
    {  slug, ratings,hygienePoints}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          ratings,
          hygienePoints
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }
  async createpayment({
    slug,
    amount,
    userid,
    resid,
    paymentdetails,
    date,
    dateonbook
    
}) {
  try {
    return await this.databases.createDocument(
      conf.databaseid,
       conf.collectionid3,
      slug,
      {
        slug,
        amount,
        userid,
        resid,
        paymentdetails,
        date,
        dateonbook
        
    
        
      }
    );
  } catch (error) {
    console.log("Appwrite service :: create payment :: error", error);
    throw error;
  }
}
  async creatreview({
    resid,
    rating,
    userid,
    recommendedfood,
    slug,
    comment,
    
    
    
    
}) {
  try {
    return await this.databases.createDocument(
      conf.databaseid,
       conf.collectionid4,
      slug,
      {
        rating,
        comment,
        userid,
        resid,
        recommendedfood,
        
        
    
        
      }
    );
  } catch (error) {
    console.log("Appwrite service :: createreview :: error", error);
    throw error;
  }
}


  async getUser(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getUser :: error", error);
      throw error;
    }
  }
  async getuseruser(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid2,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getUser :: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.storageid, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview({fileId}) {
    return this.storage.getFilePreview(conf.storageid, fileId);
  }

  async uploadFile({file}) {
    try {
      return await this.storage.createFile(conf.storageid, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }
  async getres({ slug }) {
    try {
      return await this.databases.getDocument(conf.databaseid, conf.collectionid, slug);
    } catch (error) {
      console.log("Appwrite service :: getres :: error", error);
      throw error;
    }
  }
  async getqueryres({query}){
    try {
        return await this.databases.listDocuments(
        conf.databaseid,
        conf.collectionid,
        query

        )
        
    } catch (error) {
       console.log(error)
      
    }
   }
   async  getpayments({ queries }) {
    try {
      console.log(queries); // Debug the queries
      return await this.databases.listDocuments(
        conf.databaseid,
        conf.collectionid3,
        queries
      );
    } catch (error) {
      console.log(error);
    }
  }
   async  getpayment({ slug }) {
    try {
      console.log(queries); // Debug the queries
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid3,
       {
        slug
       }
      );
    } catch (error) {
      console.log(error);
    }
  }
  
  async getreviews({query}){
    try {
        return await this.databases.listDocuments(
        conf.databaseid,
        conf.collectionid4,
        query

        )
        
    } catch (error) {
       console.log(error)
      
    }
   }

   async updatevehicaldetails(
   
    {  slug, vehicaldetails,canprovidevehical}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          vehicaldetails,
          canprovidevehicalc
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
      throw error;
    }
  }

  async createtravelpayments({
    slug,
    amount,
    userid,
    resid,
    userlatitude,
    userlogitude,
    istraveled
  

    
}) {
  try {
    return await this.databases.createDocument(
      conf.databaseid,
       conf.collectionid3,
      slug,
      {
        slug,
        amount,
        userid,
        resid,
        userlatitude,
        userlogitude,
        istraveled
        
    
        
      }
    );
  } catch (error) {
    console.log("Appwrite service :: create payment :: error", error);
    throw error;
  }
}

}

const profileService = new ProfileServices();
export default profileService;
