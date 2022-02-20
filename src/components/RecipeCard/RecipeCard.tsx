import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from '@ionic/react';
import './RecipeCard.css';
import { IRecipeFields } from '../../@types/generated/contentful';

interface Props {
  data: IRecipeFields;
  id: string;
}

const RecipeCard: React.FC<Props> = (props) => {
  const { category, description, duration, image, title, vegetarian } = props.data;

  return (
    <IonCard routerLink={`recipe/${props.id}`}>
      {image && <IonImg alt={image.fields.file.fileName} src={image.fields.file.url} />}
      <IonCardHeader>
        <IonCardSubtitle>
          {category}, {duration}, {vegetarian && 'veggi'}
        </IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{description}</IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;
