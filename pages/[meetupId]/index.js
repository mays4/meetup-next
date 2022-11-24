import MeetupDetail from "../../ components/meetups/MeetupDetail";
import Head from 'next/head'
import {MongoClient,ObjectId} from 'mongodb'
import { Fragment } from "react";
function NewMeetDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
  );
}
export async function getStaticPaths(){
  const client = await MongoClient.connect();
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
   const meetups = await meetupsCollection.find({},{_id:1}).toArray();
  client.close();
  
   return {
    fallback:false,
    paths:meetups.map((meetup)=>({
     params:{meetupId:meetup._id.toString()}
    }))
    // paths:[
    //   {params:{
    //     meetupId:'m1'
    //   }},{params:{
    //     meetupId:'m2'
    //   }},
    // ]
  }

}
export  async function getStaticProps(context){
  const meetupId= context.params.meetupId;
  const client = await MongoClient.connect('');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
   const selectedMeetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)});
  client.close();

  // console.log(meetupId)
  return {
    props:{
      meetupData:{
        id:selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        address:selectedMeetup.address,
        image:selectedMeetup.image,
        description:selectedMeetup.description
      // meetupData:{
      //   image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
      //   id:meetupId,
      //   title:"A first meeting",
      //   address:"some 5 street",
      //   description:"The meetup description"
      // }
    },
    
  }
}
}
export default NewMeetDetails;
