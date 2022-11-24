import MeetUpList from '../ components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import Head from 'next/head'
import { Fragment } from 'react';

// const DUMMY_MEETUPS=[
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!'
//   }
// ];
function HomePage(props){

  return(
  <Fragment>
    <Head>
      <title >React Meetups</title>
      <meta name='description' content='Browse activities'></meta>
    </Head>
   <MeetUpList meetups={props.meetups}/>
   </Fragment>
  )
}


export  async function getStaticProps(){
  const client = await MongoClient.connect('');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
   const meetups = await meetupsCollection.find().toArray();
    

    client.close();
    // res.status(201).json({message:'Meetup inserted!'});
  
  return {
    props:{
      meetups:meetups.map((meetup)=>({
        title:meetup.title,
        address: meetup.address,
        image: meetup.image,
        id:meetup._id.toString()
      }))
    },
    revalidate:10
  }
}

// export async function getServerSideProps(context){
//   const req= context.req;
//   const res = context.res;
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     } 
//   }
// }
export default HomePage;