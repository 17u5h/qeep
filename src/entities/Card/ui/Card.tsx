import React, {useEffect, useState} from 'react';
import cls from "./Card.module.css";
import axios, {AxiosProgressEvent} from "axios";
import {File, Hint} from "../../../widgets/DragNDropTable/ui/DragNDropTable";

type Props = {
	file: File
	index: number
	countUploadedFiles: boolean[]
	submit: boolean
	api_url: string
	setHint: (hint: string) => void
	files: File[]
	setFiles: (files: File[]) => void
	setSubmit: (submit: boolean) => void
}

const Card = ({file, index, submit, api_url, setHint, files, setFiles, setSubmit, countUploadedFiles}: Props) => {

	const [progress, setProgress] = useState<Record<string, boolean | number> | undefined>({isStarted: false, percent: 0})

	const uploadProgress = (event: AxiosProgressEvent) => {
		setProgress(prev => {
			if (!event.progress) return
			return {...prev, percent: event.progress * 100}
		})
	}

	const fetchFile = async () => {
		if (!submit || !file) return

		const formData = new FormData()
		formData.append(`image${index + 1}`, file.toString())

		try {
			setProgress(prev => ({...prev, isStarted: true}))
			await axios.post(api_url, formData, {
				onUploadProgress: (progressEvent) => uploadProgress(progressEvent)
			})
			countUploadedFiles.push(true)

			if (files.length === countUploadedFiles.length) {
				setFiles([])
				setSubmit(false)
				countUploadedFiles.length = 0
				setHint(Hint.PICTURES_SENT)
				setTimeout(() => {
					setHint(Hint.LOAD_PICTURES)
				}, 2000)
			}
		} catch (e) {
			console.log(e)
			setHint(Hint.PICTURES_NOT_SENT)
		} finally {
			setProgress(prev => ({...prev, isStarted: false}))
		}
	}

	useEffect(() => {
		if (!submit) return
		fetchFile()
	}, [submit])

	return (<div className={cls.cardContainer}>
			<img src={file?.toString()} className={cls.image} alt='picture'/>
			{progress?.isStarted && <progress max='100' value={Number(progress.percent)}></progress>}
		</div>
	);
};

export default Card;