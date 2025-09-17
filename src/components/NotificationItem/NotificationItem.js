import moment from "moment";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { config } from "../../config/appConfig";
import { Icons } from "../../config/icons";
import { calcHeight, calcWidth } from "../../config/metrics";
import { TextWithIcon, Text_ } from "../../Molecules";
import { FadeView } from "../../Molecules/FadeView/FadeView";
import { Image_ } from "../../Molecules/Image/Image";
import { Button } from "../Button/Button";

type NotificationItemProps = {
    onPress: Function,
    title: String,
    body: String,
    time: String,
    image: String
}

export function NotificationItem(params: NotificationItemProps) {
    let data = {}
    try {
        data = JSON.parse(params.data)
    }
    catch {

    }
    return (
        <Button activeOpacity={1} onPress={params.onPress} withoutPadding style={{ backgroundColor: config.colors.WHITE, width: calcWidth(355), marginTop: calcHeight(6), borderRadius: RFValue(5, 812), borderWidth: 1, borderColor: config.colors.BORDER_COLOR, overflow: "hidden", height: calcHeight(params.image ? 91 : 80), justifyContent: "flex-start", alignItems: "center" }}>
            {params.image_url ? <Image_ style={{ width: calcWidth(97), height: calcHeight(76), borderRadius: RFValue(5, 812), marginHorizontal: calcWidth(7) }} source={{ uri: data.image_url }} /> :
                <Icons style={{ paddingHorizontal: calcWidth(10) }} name={"notification"} width={RFValue(40, 812)} height={RFValue(40, 812)} color={config.colors.BLUE} />
            }
            <View style={{ alignItems: "flex-start" }}>
                <Text_ fontSize={"14"} style={{ marginTop: calcHeight(10),width:calcWidth(200) }} textAlign={"left"} fontFamily={"bold"}>{params.title}</Text_>
                <Text_ textAlign={"left"} fontSize={"12"} style={{ marginTop: calcHeight(5), width: calcWidth(235) }} color={config.colors.BLUE} fontFamily={"medium"}>{data.name ?data.name : params.data}</Text_>
                <TextWithIcon fontFamily={"bold"} textColor={config.colors.GRAY} fontSize={"11"} text={moment(params.created_at).fromNow()} iconName={"clock"} iconStyle={{ width: RFValue(12, 812), height: RFValue(12, 812) }} />
            </View>
        </Button>

    )
}


export function LoadingNotificationItem(params) {
    let length = Array.from(Array(params.length).keys())
    return (
        <View duration={params.isLoading ? 10 : 1500} isActive={params.isLoading} style={[{ marginTop: calcHeight(5) }, params.style]} >
            {length.map(() => {
                return (
                    <View style={[{ width: calcWidth(355), borderColor: config.colors.BORDER_COLOR, height: calcHeight(91), marginBottom: calcHeight(6), borderRadius: RFValue(5, 812), backgroundColor: config.colors.WHITE, overflow: "hidden" }]}>
                        <ContentLoader
                            title={"dfd"}
                            // height={calcHeight(218)}
                            speed={.9}
                            backgroundColor={"#f2f2f2"}
                            foregroundColor={"#e0e0e0"}

                            viewBox={`0 0 ${calcWidth(355)} ${calcHeight(91)}`}
                        >
                            <Rect x={calcWidth(250)} y={calcHeight(8)} rx="5" ry="5" width={`${calcWidth(97)}`} height={`${calcHeight(76)}`} />
                            <Rect
                                x={calcWidth(85)}
                                y={calcHeight(15)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(157)}`}
                                height={`${calcHeight(20)}`}
                            />
                            <Rect
                                x={calcWidth(122)}
                                y={calcHeight(40)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(120)}`}
                                height={`${calcHeight(15)}`}
                            />
                            <Rect
                                x={calcWidth(192)}
                                y={calcHeight(60)}
                                rx={`${calcHeight(15 / 2)}`}
                                ry={`${calcHeight(15 / 2)}`}
                                width={`${calcWidth(50)}`}
                                height={`${calcHeight(15)}`}
                            />
                        </ContentLoader>
                    </View>
                )
            })}
        </View>
    )

}