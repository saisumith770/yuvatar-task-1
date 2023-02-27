import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CoursePageShell } from "../components/coursePageShell";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";
import { Link, useNavigate } from "react-router-dom";

interface CurriculumPageProps {}

const modulesData = [
	{
		moduleName: "Module 1:Introduction",
		edit: false,
		module_id: uuidv4(),
		lectures: [
			{
				lectureName: "Lecture 1:Introduction",
				edit: false,
				lecture_id: uuidv4(),
			},
		],
	},
];

const EditInput: React.FC<{ name: string; edit: boolean; onOutsideClick: Function; editModule: Function; deleteModule: Function }> = ({
	name,
	edit,
	deleteModule,
	editModule,
	onOutsideClick,
}) => {
	const inputRef = useRef(null);
	const [editedText, setText] = useState(name);
	useClickOutside([inputRef], () => onOutsideClick(editedText));
	return (
		<div style={{ display: "flex" }} ref={inputRef}>
			<div>
				{!edit && <Heading>{name}</Heading>}
				{edit && (
					<Input
						name={name}
						defaultValue={name}
						onChange={(e) => {
							setText(e.currentTarget.value);
						}}
					/>
				)}
			</div>
			<img src="/edit.svg" style={{ marginInline: "10px", cursor: "pointer" }} onClick={() => editModule()} />
			<img src="/delete.svg" onClick={() => deleteModule()} style={{ cursor: "pointer" }} />
		</div>
	);
};

export const Curriculum: React.FC<CurriculumPageProps> = () => {
	const navigate = useNavigate();
	const [modules, setModules] = useState(modulesData);

	return (
		<CoursePageShell
			progress={37}
			onSave={() => {
				modules.forEach((module) => {
					const form = new FormData();
					form.append("module_number", 12 as any);
					form.append("module_name", module.moduleName);
					form.append("course_id", 12 as any);

					fetch("https://api.youvatar.in/courses/create_course/module", {
						body: form,
						method: "POST",
						headers: {
							session_token: "60d0e366-bae3-47e1-b093-abc5fe3bc360",
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
						},
					});

					module.lectures.forEach((lecture) => {
						const form = new FormData();
						form.append("lecture_number", 12 as any);
						form.append("lecture_name", lecture.lectureName);
						form.append("module_id", 12 as any);

						fetch("https://api.youvatar.in/courses/create_course/lecture", {
							body: form,
							method: "POST",
							headers: {
								session_token: "60d0e366-bae3-47e1-b093-abc5fe3bc360",
								"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
							},
						});
					});
				});
			}}
		>
			<Text>Start putting together your course by creating sections, lectures and practice</Text>

			{modules.map((module, index) => (
				<ModuleContainer key={index}>
					<EditInput
						name={module.moduleName}
						edit={module.edit}
						deleteModule={() =>
							setModules((prev) => {
								const arr = prev.filter((module_) => module.module_id !== module_.module_id);
								return arr;
							})
						}
						editModule={() =>
							setModules((prev) =>
								prev.map((module_) => {
									if (module_.module_id === module.module_id) return { ...module_, edit: true };
									return module_;
								})
							)
						}
						onOutsideClick={(editedText: string) =>
							setModules((prev) =>
								prev.map((module_) => {
									if (module_.module_id === module.module_id) return { ...module_, moduleName: editedText, edit: false };
									return module_;
								})
							)
						}
					/>

					{module.lectures.map((lecture, index) => (
						<div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "0 0 10px 0" }} key={index}>
							<LectureContainer>
								<EditInput
									name={lecture.lectureName}
									edit={lecture.edit}
									deleteModule={() =>
										setModules((prev) => {
											const arr = prev.map((module_) => {
												if (module_.module_id === module.module_id) {
													const lectures = module_.lectures.filter((lecture_) => {
														return lecture_.lecture_id !== lecture.lecture_id;
													});
													return { ...module_, lectures };
												}
												return module_;
											});
											return arr;
										})
									}
									editModule={() =>
										setModules((prev) =>
											prev.map((module_) => {
												if (module_.module_id === module.module_id) {
													module_.lectures = module_.lectures.map((lecture_) => {
														if (lecture_.lecture_id === lecture.lecture_id) return { ...lecture_, edit: true };
														return lecture_;
													});
												}
												return module_;
											})
										)
									}
									onOutsideClick={(editedText: string) =>
										setModules((prev) =>
											prev.map((module_) => {
												if (module_.module_id === module.module_id) {
													module_.lectures = module_.lectures.map((lecture_) => {
														if (lecture_.lecture_id === lecture.lecture_id)
															return { ...lecture_, lectureName: editedText, edit: false };
														return lecture_;
													});
												}
												return module_;
											})
										)
									}
								/>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										position: "absolute",
										right: "10px",
									}}
								>
									<SubHeading>Add Assignments</SubHeading>
									<Button width={200}>
										<ButtonText color="white">Add Resouce</ButtonText>
									</Button>
								</div>
							</LectureContainer>
						</div>
					))}

					<Button
						width={200}
						style={{ position: "relative", left: "8px", margin: "10px 0 10px 0", cursor: "pointer" }}
						onClick={() =>
							setModules((prev) => {
								return prev.map((module_) => {
									if (module_.module_id === module.module_id) {
										return {
											...module_,
											lectures: [
												...module.lectures,
												{ lecture_id: uuidv4(), edit: false, lectureName: "Lecture 1:Introduction" },
											],
										};
									}
									return module_;
								});
							})
						}
					>
						<ButtonText color="white">Add next lecture</ButtonText>
					</Button>
				</ModuleContainer>
			))}

			<Button
				width={200}
				style={{ marginTop: "10px", cursor: "pointer" }}
				onClick={() =>
					setModules((prev) => {
						const arr = [...prev];
						arr.push({
							moduleName: "Module 1:Introduction",
							edit: false,
							module_id: uuidv4(),
							lectures: [
								{
									lecture_id: uuidv4(),
									edit: false,
									lectureName: "Lecture 1:Introduction",
								},
							],
						});
						return arr;
					})
				}
			>
				<ButtonText color="white">Add New Module</ButtonText>
			</Button>

			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<ButtonText color="#3949AB" onClick={() => navigate(-1)}>
					Back
				</ButtonText>
				<Link to="/">
					<Button>
						<ButtonText color="white">Proceed</ButtonText>
					</Button>
				</Link>
			</div>
		</CoursePageShell>
	);
};

const Text = styled.h4`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 130%;
	/* identical to box height, or 21px */

	letter-spacing: -0.01em;

	color: #121212;
`;

const ModuleContainer = styled.div`
	box-sizing: border-box;

	/* position: absolute; */
	width: 796px;
	/* left: 466px; */
	/* top: 462px; */

	background: #ffffff;
	border: 1px solid #c7c9d9;
	margin: 20px 0 0 0;
`;

const Heading = styled.h4`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 130%;
	margin: 10px;
	/* or 21px */

	letter-spacing: -0.01em;

	color: #121212;
`;

const SubHeading = styled.h4`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	/* identical to box height */

	display: flex;
	align-items: flex-end;
	margin: 10px;

	color: #3949ab;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
`;

const LectureContainer = styled.div`
	box-sizing: border-box;

	width: 770px;
	height: 53px;

	border: 1px solid #c7c9d9;

	display: flex;
	align-items: center;
	position: relative;
`;

const Input = styled.input`
	box-sizing: border-box;

	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 130%;

	/* Auto layout */

	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 18px 16px;
	margin: 5px;
	gap: 10px;

	width: 250px;
	height: 40px;

	background: #f8fbfc;
	border: 1px solid #d8dadc;
	border-radius: 10px;
	margin-left: 5px;

	/* Inside auto layout */

	flex: none;
	order: 1;
	align-self: stretch;
	flex-grow: 0;
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

const Button = styled.div<{ width?: number }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: ${(props) => (props.width ? `${props.width}px` : "120px")};
	height: 35px;

	background: #3949ab;
	border-radius: 4px;

	margin-inline: 5px;
	cursor: pointer;
`;
