import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import './RecipeCard.css';

interface Props {
  data: any;
}

const RecipeCard: React.FC<Props> = (data: any) => {
  const { category, description, duration, image, ingredients, title, vegetarian } = data.data;

  return (
    <IonCard>
      {image && <img alt={image.fields.file.title} src={image.fields.file.url} />}
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
