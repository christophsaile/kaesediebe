import {
  IonItem,
  IonThumbnail,
  IonLabel,
  IonImg,
  IonGrid,
  IonRow,
  IonIcon,
  IonChip,
} from '@ionic/react';
import './RecipeItem.css';
import { IRecipeFields } from '../../@types/generated/contentful';
import { timeOutline, leafOutline, restaurantOutline } from 'ionicons/icons';

interface Props {
  data: IRecipeFields;
  id: string;
}

const RecipeItem: React.FC<Props> = (props) => {
  const { category, duration, image, title, vegetarian } = props.data;

  return (
    <IonItem routerLink={`recipe/${props.id}`}>
      <IonThumbnail slot='start'>
        {image && <IonImg alt={image.fields.file.fileName} src={image.fields.file.url} />}
      </IonThumbnail>
      <IonLabel>
        <IonGrid>
          <IonRow>
            <h2>{title}</h2>
            <IonIcon className='veggi-icon' icon={vegetarian ? leafOutline : ''}></IonIcon>
          </IonRow>
          <IonRow>
            <IonChip outline color='primary'>
              <IonIcon icon={timeOutline}></IonIcon>
              <IonLabel>{duration}</IonLabel>
            </IonChip>
            <IonChip outline color='primary'>
              <IonIcon icon={restaurantOutline}></IonIcon>
              <IonLabel>{category}</IonLabel>
            </IonChip>
          </IonRow>
        </IonGrid>
      </IonLabel>
    </IonItem>
  );
};

export default RecipeItem;
