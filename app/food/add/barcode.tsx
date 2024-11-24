import React, {useState} from "react";
import {ActivityIndicator, Animated, StyleSheet, View} from "react-native";
import {BarcodeScanningResult, CameraView} from 'expo-camera';
import {useNavigation} from "@react-navigation/native";
import {Colors} from "@/constants/Color";
import StyledText from "@/components/shared/Text";
import {TextSize} from "@/enums/TextSize";
import useToastStore from "@/state/toast";
import {Column} from "@/components/shared/Column";
import {Row} from "@/components/shared/Row";
import {Image} from 'expo-image';
import StyledButton from "@/components/shared/Button";
import {ButtonSize, ButtonStyle} from "@/types/Button";
import {CustomAxios} from "@/utils/api";

// API 응답 타입 정의
interface BarcodeApiResponse {
	data: {
		entityId: string;
		product: {
			name: string;
			expiryDate: string;
			image: string;
		}
	}
}

interface ProductInfo {
	name: string;
	expiryDate: string;
	image: string;
}

// 에러 처리를 위한 커스텀 에러 클래스
class BarcodeError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BarcodeError';
	}
}

const PageBarcodeRecognitions = () => {
	const [isScanning, setIsScanning] = useState(true);
	const [isValidating, setIsValidating] = useState(false);
	const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
	const [modalAnimation] = useState(new Animated.Value(0));
	const [isAddingIngredient, setIsAddingIngredient] = useState(false);
	const navigation = useNavigation();
	const {addToast} = useToastStore();

	const showModal = () => {
		Animated.spring(modalAnimation, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};

	const validateBarcode = async (barcode: string): Promise<ProductInfo> => {
		try {
			const response = await CustomAxios.post<BarcodeApiResponse>('/refrigerator/barcode', {
				barcode: barcode
			});

			if (!response.data?.data?.product) {
				throw new BarcodeError('유효하지 않은 바코드입니다.');
			}

			return {
				name: response.data.data.product.name,
				expiryDate: response.data.data.product.expiryDate,
				image: response.data.data.product.image
			};
		} catch (error) {
			// 네트워크 오류나 서버 오류 처리
			if (error instanceof BarcodeError) {
				throw error;
			}

			throw new BarcodeError('바코드 검증 중 오류가 발생했습니다.');
		}
	};

	const handleBarcodeScanned = async ({data: barcode}: BarcodeScanningResult) => {
		if (!isScanning) return;

		try {
			setIsScanning(false);
			setIsValidating(true);
			showModal();
			addToast('바코드를 인식했습니다.', 'success', 1500);

			const product = await validateBarcode(barcode);
			setProductInfo(product);
		} catch (error) {
			if (error instanceof BarcodeError) {
				addToast(error.message, 'error', 3000);
			} else {
				addToast('알 수 없는 오류가 발생했습니다.', 'error', 3000);
			}
			navigation.goBack();
		} finally {
			setIsValidating(false);
		}
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	const handleAddIngredient = async () => {
		if (!productInfo) return;

		try {
			setIsAddingIngredient(true);

			// 재료 추가 API 호출
			await CustomAxios.post('/refrigerator/add', {
				name: productInfo.name,
				quantity: "1",
				icon: "🥛", // 기본 아이콘
				items: [{
					name: productInfo.name,
					quantity: 1
				}]
			});

			addToast('재료가 추가되었습니다.', 'success', 1500);
			navigation.goBack();
		} catch (error) {
			addToast('재료 추가에 실패했습니다.', 'error', 3000);
		} finally {
			setIsAddingIngredient(false);
		}
	};

	const modalTranslateY = modalAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: [1000, 0],
	});

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
				active={isScanning}
			>
				<View style={styles.overlay}>
					<View style={styles.unfocusedContainer}></View>
					<View style={styles.middleContainer}>
						<View style={styles.unfocusedContainer}></View>
						<View style={styles.focusedContainer}>
							<View style={[styles.cornerMarker, styles.topLeft]}/>
							<View style={[styles.cornerMarker, styles.topRight]}/>
							<View style={[styles.cornerMarker, styles.bottomLeft]}/>
							<View style={[styles.cornerMarker, styles.bottomRight]}/>
						</View>
						<View style={styles.unfocusedContainer}></View>
					</View>
					<View style={styles.unfocusedContainer}>
						<StyledText
							size={TextSize.ContentLarge}
							color="surface"
							style={styles.instruction}
						>
							바코드를 스캔해주세요
						</StyledText>
					</View>
				</View>
			</CameraView>

			<Animated.View
				style={[
					styles.modal,
					{
						transform: [{translateY: modalTranslateY}],
						opacity: modalAnimation,
					},
				]}
			>
				<Column style={styles.modalContent}>
					{isValidating ? (
						<View style={styles.textView}>
							<ActivityIndicator size="large" color={Colors.contentSecondary}/>
							<StyledText
								size={TextSize.ContentLarge}
								color="contentDim"
								style={styles.modalText}
							>
								바코드가 유효성을 검증하고 있습니다{'\n'}잠시만 기다려주세요
							</StyledText>
						</View>
					) : productInfo && (
						<>
							<Column style={styles.productRow}>
								<Image
									source={productInfo.image}
									style={styles.productImage}
									contentFit="cover"
								/>
								<Column style={styles.productInfo}>
									<StyledText size={TextSize.ContentLarge} color="content">
										{productInfo.name}
									</StyledText>
									<StyledText size={TextSize.BodySmall} color="contentDim">
										유통기한: {productInfo.expiryDate}
									</StyledText>
								</Column>
							</Column>
							<Row style={styles.buttonRow}>
								<StyledButton
									style={ButtonStyle.Secondary}
									size={ButtonSize.Large}
									onPress={handleCancel}
									disabled={isAddingIngredient}
								>
									취소
								</StyledButton>
								<StyledButton
									style={ButtonStyle.Primary}
									size={ButtonSize.Large}
									onPress={handleAddIngredient}
									disabled={isAddingIngredient}
									buttonStyles={{flex: 1}}
								>
									{isAddingIngredient ? (
										<ActivityIndicator color={Colors.surface}/>
									) : (
										"재료 추가하기"
									)}
								</StyledButton>
							</Row>
						</>
					)}
				</Column>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.content,
	},
	camera: {
		flex: 1,
	},
	overlay: {
		flex: 1,
	},
	unfocusedContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	middleContainer: {
		flexDirection: 'row',
		height: 200,
	},
	focusedContainer: {
		flex: 6,
		position: 'relative',
	},
	instruction: {
		textAlign: 'center',
		width: '100%',
		position: 'absolute',
		top: 50,
	},
	cornerMarker: {
		borderColor: Colors.brand,
		borderWidth: 3,
		height: 20,
		width: 20,
		position: 'absolute',
	},
	topLeft: {
		top: 0,
		left: 0,
		borderBottomWidth: 0,
		borderRightWidth: 0,
	},
	topRight: {
		top: 0,
		right: 0,
		borderBottomWidth: 0,
		borderLeftWidth: 0,
	},
	bottomLeft: {
		bottom: 0,
		left: 0,
		borderTopWidth: 0,
		borderRightWidth: 0,
	},
	bottomRight: {
		bottom: 0,
		right: 0,
		borderTopWidth: 0,
		borderLeftWidth: 0,
	},
	modal: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: Colors.surface,
		borderTopRightRadius: 22,
		borderTopLeftRadius: 22,
		padding: 16,
	},
	modalContent: {
		justifyContent: 'center',
		gap: 12,
		minHeight: 200,
	},
	modalText: {
		textAlign: 'center',
	},
	textView: {
		margin: 'auto',
		gap: 16,
		marginVertical: 22,
	},
	productRow: {
		padding: 16,
		gap: 16,
		alignItems: 'center',
	},
	productImage: {
		width: 160,
		height: 160,
		borderRadius: 8,
	},
	productInfo: {
		flex: 1,
		gap: 8,
		alignItems: 'center',
	},
	buttonRow: {
		marginTop: 16,
		gap: 8,
		justifyContent: 'space-between',
	}
});

export default PageBarcodeRecognitions;