import React, {useState} from 'react';
import cls from './DragNDropTable.module.css'
import {FileUploader} from "react-drag-drop-files";
import {Button} from "../../../shared/Button";
import {Card} from "../../../entities/Card";

const fileTypes = ["JPG", "PNG", "GIF"];

const API_URL = 'http://httpbin.org/post'

export enum Hint {
	LOAD_PICTURES = 'Загрузите фотографии',
	PICTURES_SENT = 'Фотографии отправлены',
	PICTURES_NOT_SENT = 'Фотографии не отправлены'
}

const DragNDropTable = () => {

	const [files, setFiles] = useState<(string | ArrayBuffer | null)[]>([]);
	const [file, setFile] = useState<string | ArrayBuffer | null>(null)
	const [hint, setHint] = useState<string>(Hint.LOAD_PICTURES)
	const [submit, setSubmit] = useState<boolean>(false)

	let countUploadedFiles: boolean[] = []


	const handleChange = (file: Blob | null) => {
		if (!file) return
		const currentFile = new FileReader

		currentFile.onload = () => {
			setFile(currentFile.result)
			files.push(currentFile?.result)
			setFiles(files)
		}
		currentFile.readAsDataURL(file)
	};

	return (
		<>
			<FileUploader handleChange={handleChange} name="file" types={fileTypes} classes={cls.dropArea}>
				{files.map((file, index) => (<Card
					key={`${file?.toString()}${index}`}
					file={file}
					index={index}
					countUploadedFiles={countUploadedFiles}
					submit={submit}
					api_url={API_URL}
					setHint={setHint}
					files={files}
					setFiles={setFiles}
					setSubmit={setSubmit}
				/>))}
				<span className={cls.hint}>{hint}</span>
			</FileUploader>
			<Button onClick={() => setSubmit(true)}>Отправить</Button>
		</>
	);
};

export default DragNDropTable;