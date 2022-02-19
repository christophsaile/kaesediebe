import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Home.css';
const contentful = require('contentful');

const Home: React.FC = () => {
  const [contentfulData, setContentfulData] = useState([]);

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

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {contentfulData?.map((item: any) => {
            return <RecipeCard data={item.fields} id={item.sys.id} key={item.sys.id} />;
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
