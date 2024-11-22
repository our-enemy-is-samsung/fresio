import React, {useEffect, useState} from "react";
import {FlatList, Keyboard, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import View from "@/components/shared/View";
import {Colors} from "@/constants/Color";
import Recipe from "@/components/shared/Recipe";
import {Row} from "@/components/shared/Row";
import {TextSize} from "@/enums/TextSize";
import StyledText from "@/components/shared/Text";
import useToastStore from "@/state/toast";
import useRecipeSearchStore from "@/state/recipeSearch";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import TrendingSearches from "@/components/search/TrendingSearchs";
import AntDesign from "@expo/vector-icons/AntDesign";
import RecentSearchLabel from "@/components/search/recentSearchLabel";
import {router} from "expo-router";

const PageSearch = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchMessage, setSearchMessage] = useState("");
	const {addToast} = useToastStore();
	const {
		recipes,
		isLoading,
		searchRecipes,
		recentSearches,
		loadRecentSearches,
		clearRecentSearches
	} = useRecipeSearchStore();
	const insets = useSafeAreaInsets();

	useEffect(() => {
		loadRecentSearches();
	}, []);

	const handleSearch = async (query: string = searchQuery) => {
		const searchTerm = query.trim();

		if (!searchTerm) {
			setSearchMessage("검색어를 입력해주세요");
			return;
		}

		try {
			setSearchMessage("레시피를 찾는 중입니다...");
			await searchRecipes(searchTerm).then((result) => {
				if (result.length > 0) {
					setSearchMessage(`레시피를 찾았습니다`);
				} else {
					setSearchMessage("검색 결과가 없습니다");
				}
			})
		} catch (error) {
			setSearchMessage("레시피 검색에 실패했습니다");
		}
	};

	const handleClearHistory = async () => {
		try {
			await clearRecentSearches();
			addToast("검색 기록이 삭제되었습니다", "success");
		} catch (error) {
			addToast("검색 기록 삭제에 실패했습니다", "error");
		}
	};

	const handleTrendingSelect = (keyword: string) => {
		setSearchQuery(keyword);
		handleSearch(keyword);
	};

	const renderRecentSearches = () => (
		<View style={styles.recentContainer}>
			<Row style={styles.recentHeader}>
				<StyledText size={TextSize.BodySmall} color="content" style={styles.recentTitle}>
					최근 검색어
				</StyledText>
				{recentSearches.length > 0 && (
					<TouchableOpacity onPress={handleClearHistory}>
						<StyledText size={TextSize.BodySmall} color={'contentSecondary'}>모두 지우기</StyledText>
					</TouchableOpacity>
				)}
			</Row>
			{recentSearches.length === 0 ? (
				<StyledText size={TextSize.BodySmall} color="contentDim" style={styles.noRecent}>
					최근 검색 기록이 없습니다
				</StyledText>
			) : (
				<Row style={{gap: 4}}>
					{recentSearches.map((search, idx) => (
						<RecentSearchLabel key={idx} name={search.keyword} onClose={() => {
						}}/>
					))}
				</Row>
			)}
		</View>
	);

	return (
		<View style={{
			...styles.container,
			paddingTop: insets.top,
		}}>
			<Row style={{width: '100%'}}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<AntDesign name="left" size={24} color={Colors.content}/>
				</TouchableOpacity>
				<Row style={styles.searchBar}>
					<TextInput
						style={styles.input}
						placeholder="레시피 검색"
						value={searchQuery}
						placeholderTextColor={Colors.contentDim}
						onChangeText={setSearchQuery}
						onSubmitEditing={() => handleSearch()}
					/>
					{searchQuery ? (
						<Feather
							name="x"
							size={24}
							color={Colors.contentDim}
							onPress={() => {
								setSearchQuery('');
								setSearchMessage('');
								Keyboard.dismiss();
							}}
							style={styles.searchIcon}
						/>
					) : (
						<Feather
							name="search"
							size={24}
							color={Colors.contentDim}
							onPress={() => handleSearch()}
							style={styles.searchIcon}
						/>
					)}
				</Row>
			</Row>

			{searchMessage && (
				<StyledText size={TextSize.BodySmall} color="contentDim" style={styles.message}>
					{searchMessage}
				</StyledText>
			)}

			{!isLoading && !searchQuery ? (
				<View>
					{renderRecentSearches()}
					<TrendingSearches onSelect={handleTrendingSelect}/>
				</View>
			) : (
				<FlatList
					data={recipes}
					keyExtractor={(item) => item.id}
					renderItem={({item}) => (
						<Recipe
							name={item.name}
							imageUrl={item.imageUrl}
							cookTime={item.cookTime}
							difficulty={item.difficulty}
							onPress={() => {
								addToast(`${item.name} 레시피를 선택했습니다`, "info");
							}}
						/>
					)}
					contentContainerStyle={styles.recipeList}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.surface,
	},
	backButton: {
		width: 48,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchBar: {
		flex: 1,
		backgroundColor: Colors.containerDark,
		height: 50,
		marginRight: 16,
		borderRadius: 12,
		paddingHorizontal: 16,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: Colors.content,
		height: '100%',
		marginRight: 8,
	},
	searchIcon: {
		padding: 5,
	},
	message: {
		textAlign: 'center',
		marginTop: 24,
	},
	recipeList: {
		padding: 16,
		gap: 16,
	},
	recentContainer: {
		padding: 16,
		gap: 8,
	},
	recentHeader: {
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	recentTitle: {
		fontWeight: '600',
		marginTop: 22,
	},
	recentItem: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.containerDark,
	},
	recentItemContent: {
		justifyContent: 'space-between',
	},
	recentIcon: {
		marginRight: 8,
	},
	noRecent: {
		textAlign: 'center',
		marginTop: 8,
	},
});

export default PageSearch;