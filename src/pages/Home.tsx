import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
const contentful = require('contentful');

const Home: React.FC = () => {
  const [contentfulData, setContentfulData] = useState();

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_API_KEY,
    });

    client
      .getEntries({
        content_type: 'recipe',
      })
      .then((entries: any) => {
        setContentfulData(entries.items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log(contentfulData);
  }, [contentfulData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
