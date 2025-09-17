import React, { useState } from 'react';

import Modal from 'react-native-modal';
import { calcHeight, calcWidth } from '../../../config/metrics';
import { RFValue } from 'react-native-responsive-fontsize';
import { config } from '../../../config/appConfig';
import { Button } from '../../Button/Button';
import SwipeableModal from '../../SwipeableModal/SwipeableModal';
import { TextWithIcon, Line } from '../../../Molecules';
import { FlatList } from 'react-native-gesture-handler';

type SortingModalProps = {
  isVisible: Boolean;
  onSelected: Function;
  onCancel: Function;
  data: Array<any>;
  height: Number;
};
export function SortingModal(params: SortingModalProps) {
  const [selectedIndex, setSelectedItem] = useState(-1);

  const onSelectedItem = (item: any, index: number) => {
    setSelectedItem(index);
    params.onSelected(item, index);
  };
  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={300}
      animationOut={'fadeOutDown'}
      animationIn={'fadeInUp'}
      backdropOpacity={0.4}
      // backdropColor={"white"}
      style={{ padding: 0, margin: 0, justifyContent: 'flex-end' }}
      isVisible={params.isVisible}
    >
      <SwipeableModal
        onClose={params.onCancel}
        isActive={true}
        height={params.height || calcHeight(320)}
      >
        <FlatList
          data={[...[], ...params.data]}
          renderItem={({ item, index }) => {
            let isSlected = selectedIndex === index;
            return (
              <Button
                onPress={() => onSelectedItem(item, index)}
                style={{
                  width: '100%',
                  paddingHorizontal: calcWidth(15),
                  flexDirection: 'column',
                  height: calcHeight(50),
                }}
              >
                <TextWithIcon
                  style={{ margin: 0, height: '100%', alignItems: 'center' }}
                  fontSize={'15'}
                  fontFamily={isSlected ? 'medium' : 'light'}
                  textColor={config.colors[isSlected ? 'BASE_COLOR' : 'GRAY']}
                  iconStyle={{
                    width: RFValue(20, 812),
                    height: RFValue(20, 812),
                    color: config.colors[isSlected ? 'BASE_COLOR' : 'GRAY'],
                  }}
                  text={item.name || item}
                  iconName={item.iconName}
                />
                <Line />
              </Button>
            );
          }}
        />
      </SwipeableModal>
    </Modal>
  );
}
