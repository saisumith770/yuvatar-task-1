import React, { useRef, useState, useReducer } from "react";
import { CoursePageShell } from "../components/coursePageShell";
import styled from "styled-components";
import { DropDownMenu } from "../components/dropDownMenu";
import { useClickOutside } from "../hooks/useClickOutside";
import { Link, useNavigate } from "react-router-dom";

interface LandingPageProps {}

const initialFormData = {
	school_id: 27,
	course_title: "",
	course_subtitle: "",
	course_description: "",
	course_language: "Course Language",
	course_difficulty_level: "Course Level",
	course_category: "Course Category",
	course_intro_file: null,
	course_thumbnail: null,
};

enum FormActionType {
	SET_COURSE_TITLE = "SET_COURSE_TITLE",
	SET_COURSE_SUB_TITLE = "SET_COURSE_SUB_TITLE",
	SET_COURSE_DESCRIPTION = "SET_COURSE_DESCRIPTION",
	SET_COURSE_LANGUAGE = "SET_COURSE_LANGUAGE",
	SET_COURSE_LEVEL = "SET_COURSE_LEVEL",
	SET_COURSE_CATEGORY = "SET_COURSE_CATEGORY",
	SET_COURSE_INTRO_FILE = "SET_COURSE_INTRO_FILE",
	SET_COURSE_THUMBNAIL = "SET_COURSE_THUMBNAIL",
}

const reducer = (state: typeof initialFormData, action: { type: FormActionType; newState: Partial<typeof initialFormData> }) => {
	switch (action.type) {
		case FormActionType.SET_COURSE_TITLE:
			state.course_title = action.newState.course_title!;
			return { ...state };
		case FormActionType.SET_COURSE_SUB_TITLE:
			state.course_subtitle = action.newState.course_subtitle!;
			return { ...state };
		case FormActionType.SET_COURSE_DESCRIPTION:
			state.course_description = action.newState.course_description!;
			return { ...state };
		case FormActionType.SET_COURSE_LANGUAGE:
			state.course_language = action.newState.course_language!;
			return { ...state };
		case FormActionType.SET_COURSE_LEVEL:
			state.course_difficulty_level = action.newState.course_difficulty_level!;
			return { ...state };
		case FormActionType.SET_COURSE_CATEGORY:
			state.course_category = action.newState.course_category!;
			return { ...state };
		case FormActionType.SET_COURSE_INTRO_FILE:
			state.course_intro_file = action.newState.course_intro_file!;
			return { ...state };
		case FormActionType.SET_COURSE_THUMBNAIL:
			state.course_thumbnail = action.newState.course_thumbnail!;
			return { ...state };
		default:
			return state;
	}
};

export const Landing: React.FC<LandingPageProps> = () => {
	const navigate = useNavigate();

	const uploadVideoRef = useRef<HTMLInputElement>(null);
	const uploadLandingPhotoRef = useRef<HTMLInputElement>(null);

	const [displayDropDownMenu, setDropDownMenuDisplay] = useState({
		language: false,
		level: false,
		category: false,
	});

	const languageRef = useRef(null);
	const levelRef = useRef(null);
	const categoryRef = useRef(null);

	const [formData, dispatchFormData] = useReducer(reducer, initialFormData);

	useClickOutside([languageRef], () =>
		setDropDownMenuDisplay((prev) => {
			const newObj = { ...prev };
			newObj.language = false;
			return newObj;
		})
	);
	useClickOutside([levelRef], () =>
		setDropDownMenuDisplay((prev) => {
			const newObj = { ...prev };
			newObj.level = false;
			return newObj;
		})
	);
	useClickOutside([categoryRef], () =>
		setDropDownMenuDisplay((prev) => {
			const newObj = { ...prev };
			newObj.category = false;
			return newObj;
		})
	);

	return (
		<CoursePageShell
			onSave={() => {
				const form = new FormData();
				Object.entries(formData).forEach(([key, value], _) => {
					if (key === "course_intro_file" || key === "course_thumbnail")
						form.append(key, "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg");
					else form.append(key, value as any);
				});

				fetch("https://api.youvatar.in/courses/create_course/landing_page", {
					body: form,
					method: "POST",
					headers: {
						session_token: "60d0e366-bae3-47e1-b093-abc5fe3bc360",
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				});
			}}
		>
			<Header>Course Title</Header>
			<Input
				placeholder="course title"
				onChange={(e) => dispatchFormData({ type: FormActionType.SET_COURSE_TITLE, newState: { course_title: e.currentTarget.value } })}
			/>

			<Header>Course Subtitle</Header>
			<Input
				placeholder="course subtitle"
				onChange={(e) =>
					dispatchFormData({ type: FormActionType.SET_COURSE_SUB_TITLE, newState: { course_subtitle: e.currentTarget.value } })
				}
			/>

			<Header>Course Description</Header>
			<MultiLineInput
				placeholder="Message : Congratulations in completing coursename."
				onChange={(e) =>
					dispatchFormData({ type: FormActionType.SET_COURSE_DESCRIPTION, newState: { course_description: e.currentTarget.value } })
				}
			/>

			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div style={{ position: "relative" }} ref={languageRef}>
					<Header>Language</Header>
					<DropDownSelect>
						<DropDownText>{formData.course_language}</DropDownText>
						<img
							src="/drop-down.svg"
							style={{ position: "absolute", right: "10px", cursor: "pointer", zIndex: 20 }}
							onClick={() => {
								setDropDownMenuDisplay((prev) => {
									const newObj = { ...prev };
									newObj.language = true;
									return newObj;
								});
							}}
						/>
					</DropDownSelect>

					{displayDropDownMenu.language && (
						<DropDownMenu
							data={["English", "Hindi", "Telugu", "Tamil", "Kannada"]}
							setData={(language) => {
								dispatchFormData({ type: FormActionType.SET_COURSE_LANGUAGE, newState: { course_language: language as string } });
								setDropDownMenuDisplay((prev) => {
									const newObj = { ...prev };
									newObj.language = false;
									return newObj;
								});
							}}
						/>
					)}
				</div>
				<div ref={levelRef}>
					<Header>Level</Header>
					<DropDownSelect>
						<DropDownText>{formData.course_difficulty_level}</DropDownText>
						<img
							src="/drop-down.svg"
							style={{ position: "absolute", right: "10px", cursor: "pointer" }}
							onClick={() =>
								setDropDownMenuDisplay((prev) => {
									const newObj = { ...prev };
									newObj.level = true;
									return newObj;
								})
							}
						/>
					</DropDownSelect>

					{displayDropDownMenu.level && (
						<DropDownMenu
							data={["Easy", "Medium", "Hard", "Advanced"]}
							setData={(level) => {
								dispatchFormData({ type: FormActionType.SET_COURSE_LEVEL, newState: { course_difficulty_level: level as string } });
								setDropDownMenuDisplay((prev) => {
									const newObj = { ...prev };
									newObj.level = false;
									return newObj;
								});
							}}
						/>
					)}
				</div>
				<div ref={categoryRef}>
					<Header>Category</Header>
					<DropDownSelect>
						<DropDownText>{formData.course_category}</DropDownText>
						<img
							src="/drop-down.svg"
							style={{ position: "absolute", right: "10px", cursor: "pointer" }}
							onClick={() =>
								setDropDownMenuDisplay((prev) => {
									const newObj = { ...prev };
									newObj.category = true;
									return newObj;
								})
							}
						/>
					</DropDownSelect>

					{displayDropDownMenu.category && (
						<DropDownMenu
							data={[1, 2, 3, 4]}
							setData={(category) => {
								dispatchFormData({ type: FormActionType.SET_COURSE_CATEGORY, newState: { course_category: category as string } });
								setDropDownMenuDisplay((prev) => {
									const newObj = { ...prev };
									newObj.category = false;
									return newObj;
								});
							}}
						/>
					)}
				</div>
			</div>

			<Header>Upload video or ppt</Header>
			<UploadContainer
				onClick={() => uploadVideoRef.current?.click()}
				onChange={(e) =>
					dispatchFormData({ type: FormActionType.SET_COURSE_INTRO_FILE, newState: { course_intro_file: (e.target as any).files[0] } })
				}
			>
				{formData.course_intro_file && (
					<video src={URL.createObjectURL(formData.course_intro_file)} width={300} style={{ margin: "10px" }}></video>
				)}
				{!formData.course_intro_file && (
					<div style={{ position: "relative", display: "flex", justifyContent: "center", height: "100px" }}>
						<img src="/arrow-up.svg" style={{ position: "absolute", top: "20px" }} />
						<img src="/upload-arrow-box.svg" style={{ position: "absolute", bottom: "40px" }} />
						<UploadText style={{ position: "relative", bottom: "-30px" }}>Browse to upload</UploadText>

						<input type="file" style={{ display: "none" }} ref={uploadVideoRef} accept="video/*,.ppt" />
					</div>
				)}
			</UploadContainer>

			<Header>Upload Landing photo</Header>
			<UploadContainer
				onClick={() => uploadLandingPhotoRef.current?.click()}
				onChange={(e) =>
					dispatchFormData({ type: FormActionType.SET_COURSE_THUMBNAIL, newState: { course_thumbnail: (e.target as any).files[0] } })
				}
			>
				{formData.course_thumbnail && <img src={URL.createObjectURL(formData.course_thumbnail)} width={300} style={{ margin: "10px" }}></img>}
				{!formData.course_thumbnail && (
					<div style={{ position: "relative", display: "flex", justifyContent: "center", height: "100px" }}>
						<img src="/arrow-up.svg" style={{ position: "absolute", top: "20px" }} />
						<img src="/upload-arrow-box.svg" style={{ position: "absolute", bottom: "40px" }} />
						<UploadText style={{ position: "relative", bottom: "-30px" }}>Browse to upload</UploadText>

						<input type="file" style={{ display: "none" }} ref={uploadLandingPhotoRef} accept="image/*" />
					</div>
				)}
			</UploadContainer>

			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<ButtonText color="#3949AB" onClick={() => navigate(-1)}>
					Back
				</ButtonText>
				<Link to="/curriculum">
					<Button>
						<ButtonText color="white">Proceed</ButtonText>
					</Button>
				</Link>
			</div>
		</CoursePageShell>
	);
};

const Header = styled.h4`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	/* line-height: 125%; */
	/* identical to box height, or 18px */

	display: flex;
	align-items: flex-end;

	color: #000000;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;

	position: relative;
	top: 12px;
`;

const inputstyles = `
box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
align-items: center;
padding: 18px 16px;
gap: 10px;

width: 748px;
height: 40px;

background: #F8FBFC;
border: 1px solid #d8dadc;
border-radius: 10px;

/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
`;

const Input = styled.input`
	${inputstyles}
`;
const MultiLineInput = styled.textarea`
	${inputstyles}
	resize: vertical;
	height: 100px;
`;

const DropDownSelect = styled.div`
	box-sizing: border-box;

	/* Auto layout */

	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 18px 16px;
	gap: 10px;

	width: 230px;
	height: 40px;

	background: #f8fbfc;
	border: 1px solid #d8dadc;
	border-radius: 10px;

	/* Inside auto layout */

	flex: none;
	order: 1;
	align-self: stretch;
	flex-grow: 0;

	position: relative;
`;

const DropDownText = styled.h4`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 125%;
	/* identical to box height, or 20px */

	display: flex;
	align-items: flex-end;

	color: #808080;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 1;
`;

const UploadContainer = styled.div`
	border: 1px dashed #000000;
	border-radius: 5px;
	cursor: pointer;
`;

const UploadText = styled.h4`
	font-family: "Inter";
	font-style: normal;
	font-weight: 500;
	font-size: 15px;
	line-height: 0;
	display: flex;
	align-items: center;
	text-align: center;

	color: #000000;
`;

const ButtonText = styled.h4<{ color: string }>`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;

	color: ${(props) => props.color};
	cursor: pointer;
`;

const Button = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: 120px;
	height: 35px;

	background: #3949ab;
	border-radius: 4px;

	margin-inline: 5px;
	cursor: pointer;
`;
