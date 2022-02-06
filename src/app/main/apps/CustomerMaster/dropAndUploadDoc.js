import React, { useEffect, useRef, useState, Component } from "react";
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Files from 'react-files';

import FooterLayout1 from '../../../fuse-layouts/layout1/components/FooterLayout1';

const document_formate = [
    { id: "A4_BW", text: "A4(Black & White)" },
    { id: "A3_BW", text: "A3(Black & White)" },
    { id: "A4_Color", text: "A4(Color)" },
    { id: "A3_Color", text: "A3(Color)" }
]

const page_formate = [
    { id: "single", text: "Single Side " },
    { id: "front_back", text: "Front and Back " }
]
import "./style.css"
import history from "@history";
import FuseLoading from "@fuse/core/FuseLoading";

export default class dropAndUploadDoc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            docFormat: "",
            pageFormat: "",
            total_price: "",
            loading: false
        }
        this.handleChangeDocFormate = this.handleChangeDocFormate.bind(this);
    }


    onFilesChange = (files) => {
        this.setState({
            files,
            fileNames: files.name
            // fileNames
        }, () => {
            console.log(this.state.files)
            // console.log(this.state.files.name)
        })
    }
    handleChangeDocFormate = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(" e.target.value", e.target.value)
        this.setState({
            docFormat: e.target.value
        }, () => {
            console.log(this.state)
        })
    }
    handlePageFormate = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(" e.target.value", e.target.value)
        this.setState({
            pageFormat: e.target.value
        }, () => {
            console.log(this.state)
        })
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
        alert('Error : ' + error.message)
    }

    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

    handleClick = async (event) => {
        event.preventDefault();
        console.log();
        let fData = new FormData();
        let fileNames = [];
        let myData = {};

        // const fileData=null;


        if (this.state.files.length && this.state.docFormat.length !== 0 && this.state.pageFormat.length !== 0) {
            console.log("document :", this.state.docFormat)
            console.log("files :", this.state.files)
            let fileData = null;
            for (let i = 0; i < this.state.files.length; i++) {
                fData.append("files[]", this.state.files[i]);
                fileNames[i] = this.state.files[i].name
            }
            fData.append("docFormat", this.state.docFormat)
            fData.append("pageFormat", this.state.pageFormat)
            fileData = fData;
            console.log("fileNames", fileNames)


            console.log("Filedata", fileData);
            this.setState({ loading: true });
            await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/multiple-files-upload`, fileData)
                .then((res) => {
                    // setFileData(null);
                    console.log("ressssssssssss:", res);
                    console.log("Total Cost ::", res.data.numbers.Total_Cost)
                    myData["Total_Pages"] = res.data.numbers.Total_Pages
                    myData["Total_Cost"] = res.data.numbers.Total_cost
                    myData["fileNames"] = fileNames
                    myData["docFormat"] = this.state.docFormat
                    myData["pageFormat"] = this.state.pageFormat

                    console.log("mydataaaa", myData)
                    // this.state.total_price=res.data.numbers.Total_Cost
                    this.setState({
                        total_price: res.data.numbers.Total_Cost
                    }, () => {
                        console.log(this.state)
                    })
                    localStorage.setItem('myData', JSON.stringify(myData));
                    // localStorage.setItem('files', JSON.stringify(myData));
                    // setErr([]);
                    this.setState({ loading: false });

                    alert("File Upload successfully!");
                    // let backPath = "/apps/custometPayment";
                    history.push("/apps/custometPayment")
                })
                .catch((error) => {
                    // props.history.push(backPath)
                    console.log("ERRRRRRRRRRRRRR:", error);
                    // setFileData(null);
                    this.setState({ loading: false });

                    alert("File Is Not Valid!");

                    // setErr(error.response.data.message);
                });
        } else {
            alert("Please Upload Document or Select Document Type");
            // props.history.push(backPath)
        }
    };



    render() {

        if (this.state.loading) {
            return (
                <FuseLoading />
            )
        }

        return (
            <div>
                <form encType="multipart/form-data" method="post" className="flex flex-1 w-full items-center justify-between">
                    <FusePageCarded
                        classes={{
                            toolbar: "p-0",
                            header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
                            content: "mb-60"
                        }}
                        header={
                            <div className="flex flex-1 w-full items-center justify-between">
                                <div className="flex flex-col items-start max-w-full">
                                    <div className="flex items-center max-w-full">
                                        <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography className="text-16 sm:text-20 truncate">
                                                    Upload Document
                                                </Typography>
                                            </FuseAnimate>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }
                        content={
                            <div className="p-16 my-20">
                                <div className="flex items-center">
                                    <FuseAnimate animation="transition.expandIn">
                                        <Icon className="text-32">attach_file</Icon>
                                    </FuseAnimate>
                                    <Typography className="text-20 sm:text-20 truncate my-12">
                                        Upload PDF, DOC, DOCX, PNG, JPG
                                    </Typography>
                                </div>
                                <div className="flex justify-center sm:justify-start p-16">
                                    <TextField
                                        className="mt-8 mb-16 mx-4"
                                        id="docFormate"
                                        name="docFormate"
                                        select
                                        label="Document Type"
                                        // value={form.Designation}
                                        //value={handleSupplierType()}
                                        // disabled={form.itemCategoryId === ""}
                                        // onChange={handleChangeDocFormate}
                                        value={this.state.docFormat}
                                        // onClick={(e) => this.setState({ docFormat: e.target.value })}
                                        onChange={(event) => this.handleChangeDocFormate(event)}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        // fullWidth
                                        // size="medium"
                                        style={{ width: "40%" }}
                                    >
                                        <option disabled value="">{""}</option>
                                        {
                                            document_formate.map((option) => (

                                                <option key={option.id}
                                                    // onClick={(event) => this.handleChangeDocFormate(event)}
                                                    value={option.id} >
                                                    {option.text}
                                                </option>

                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                        className="mt-8 mb-16 mx-4"
                                        id="pageFormate"
                                        name="pageFormate"
                                        select
                                        label="Page Type"
                                        // value={form.Designation}
                                        //value={handleSupplierType()}
                                        // disabled={form.itemCategoryId === ""}
                                        // onChange={handleChangeDocFormate}
                                        value={this.state.pageFormat}
                                        // onClick={(e) => this.setState({ docFormat: e.target.value })}
                                        onChange={(event) => this.handlePageFormate(event)}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        // fullWidth
                                        // size="medium"
                                        style={{ width: "40%" }}
                                    >
                                        <option disabled value="">{""}</option>
                                        {
                                            page_formate.map((option) => (

                                                <option key={option.id}
                                                    // onClick={(event) => this.handleChangeDocFormate(event)}
                                                    value={option.id} >
                                                    {option.text}
                                                </option>

                                            ))
                                        }
                                    </TextField>
                                </div>
                                <div className="flex justify-center sm:justify-start p-16 " >
                                    <div className="files p-16" style={{ border: "2px black dotted", width: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                                        <Files
                                            ref='files'
                                            className='files-dropzone '
                                            // style={{ height: '100px' }}
                                            style={{ padding: "15px 0" }}
                                            onChange={this.onFilesChange}
                                            onError={this.onFilesError}
                                            multiple
                                            maxFiles={10}
                                            maxFileSize={25000000}
                                            accepts={['image/jpg','image/png','image/jpeg', '.pdf', '.doc', '.docx']}
                                            minFileSize={0}
                                            clickable
                                        >
                                            Drop files here or click to upload
                                        </Files>
                                    </div>
                                </div>
                                {/* <button onClick={this.filesRemoveAll}>Remove All Files</button> */}
                                {/* <button onClick={this.filesUpload}>Upload</button> */}
                                <div className="flex justify-center sm:justify-start p-16 " >

                                    <Typography className="description">
                                        <b>*Note :Select PDF, DOC, DOCX, PNG or JPG to Upload</b>...
                                    </Typography>
                                </div>

                                <div className="pt-32 pl-24 flex flex-1 justify-center sm:justify-start p-16">

                                    {
                                        this.state.files.length > 0
                                            ? <div className='files-list'>
                                                <ul>{this.state.files.map((file) =>
                                                    <li className='files-list-item' key={file.id}>
                                                        <div className='files-list-item-preview'>
                                                            {file.preview.type === 'image'
                                                                ? <img className='files-list-item-preview-image' src={file.preview.url} />
                                                                : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                                                        </div>
                                                        <div className='files-list-item-content'>
                                                            <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                                            <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                                                        </div>
                                                        <div
                                                            id={file.id}
                                                            className='files-list-item-remove'
                                                            onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                                                        />
                                                    </li>
                                                )}</ul>
                                            </div>
                                            : null
                                    }
                                </div>
                                <div className="pt-32">
                                    <FuseAnimate animation="transition.slideRightIn" delay={300} >
                                        <Button
                                            // type="submit"
                                            className="whitespace-nowrap normal-case mr-20"
                                            variant="contained"
                                            color="secondary"
                                            // onClick={() => removeAllFiles()}
                                            onClick={this.filesRemoveAll}

                                        >
                                            Remove All Files
                                        </Button>

                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                        <Button
                                            type="submit"
                                            className="whitespace-nowrap normal-case"
                                            variant="contained"
                                            color="secondary"
                                            // onClick={(event) => handleClick(event)}
                                            onClick={this.handleClick}
                                        >
                                            Upload
                                        </Button>

                                    </FuseAnimate>
                                </div>

                            </div>
                        }
                        innerScroll
                    />
                </form>
                <FooterLayout1 style={{}} />
            </div>
        )
    }
}
