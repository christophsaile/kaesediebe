import { IonFab, IonFabButton, IonFabList, IonIcon, IonToast } from '@ionic/react';
import { shareSocialOutline, linkOutline, logoWhatsapp, mailOutline } from 'ionicons/icons';
import { IRecipeFields } from '../../@types/generated/contentful';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffect, useState } from 'react';
import { checkmarkCircleOutline } from 'ionicons/icons';

interface IProps {
  id: string;
  recipe?: IRecipeFields;
}

const ShareButton: React.FC<IProps> = (props) => {
  const { recipe, id } = props;
  const url = `https://kaese-diebe.netlify.app/recipe/${id}`;
  const [value] = useState(url);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (copied) {
      setShowToast(true);
    }
  }, [copied]);

  return (
    <>
      <IonFab vertical='bottom' horizontal='end' slot='fixed'>
        <IonFabButton id='filer-modal-trigger'>
          <IonIcon icon={shareSocialOutline} />
        </IonFabButton>
        <IonFabList side='top'>
          <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
            <IonFabButton>
              <IonIcon icon={linkOutline}></IonIcon>
            </IonFabButton>
          </CopyToClipboard>
          <IonFabButton
            href={`mailto:?subject=${recipe?.title} Rezept&body=Schau dir das ${recipe?.title} Rezept hier an: ${url}`}
          >
            <IonIcon icon={mailOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            href={`https://wa.me/?text=Schau%20dir%20das%20Nudelauflauf%20Rezept%20an%20${url}`}
          >
            <IonIcon icon={logoWhatsapp}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <IonToast
        color='success'
        isOpen={showToast}
        onDidDismiss={() => {
          setShowToast(false);
          setCopied(false);
        }}
        icon={checkmarkCircleOutline}
        message='Der Link wurde erfolgreich kopiert'
        duration={2000}
      />
    </>
  );
};

export default ShareButton;
