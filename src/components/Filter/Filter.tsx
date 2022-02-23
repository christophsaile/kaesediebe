import {
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
} from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { IFilterList } from '../../pages/Home/Home';

interface Props {
  setFilterList: Dispatch<SetStateAction<IFilterList[]>>;
}

const filterList: IFilterList[] = [
  { val: 'Veggi', isChecked: false },
  { val: 'Nudeln', isChecked: false },
  { val: 'Kartoffeln', isChecked: false },
  { val: 'Reis', isChecked: false },
  { val: 'Sonstiges', isChecked: false },
];

const Filter: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [filterModal, setFilterModal] = useState(filterList);

  const handleOnChange = (position: number) => {
    let updatedState = [...filterModal];
    updatedState[position].isChecked = !updatedState[position].isChecked;
    setFilterModal(updatedState);
  };

  useEffect(() => {
    document.addEventListener('ionBackdropTap', () => {
      setShowModal(false);
    });
  }, []);

  useEffect(() => {
    if (!showModal) {
      props.setFilterList(filterModal);
    }
  }, [showModal]);

  return (
    <>
      <IonFab onClick={() => setShowModal(true)} vertical='bottom' horizontal='end' slot='fixed'>
        <IonFabButton id='filer-modal-trigger'>
          <IonIcon icon={filterOutline} />
        </IonFabButton>
      </IonFab>
      <IonModal showBackdrop={true} isOpen={showModal} initialBreakpoint={0.5}>
        <IonContent scrollY={false} className='ion-padding'>
          <IonList>
            <IonItemDivider>Vegetarisch</IonItemDivider>
            {filterModal.map(({ val }, index) => {
              return (
                <IonItem key={index}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot='end'
                    value={val}
                    checked={filterModal[index].isChecked}
                    onIonChange={() => handleOnChange(index)}
                  />
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Filter;
