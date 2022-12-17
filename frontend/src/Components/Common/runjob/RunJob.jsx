import React from 'react';
import './../runjob/RunJob.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";


function RunJob({ Profile }) {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const submitHandler = async e => {
        //e.preventDefault();
        let formData = new FormData(); 
        formData.append('name', Profile.username);
        formData.append('pword', Profile.password);
        formData.append('file2upload', e.file[0]);
        try {
            let res = await fetch("/api/uploadYAML", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'encType': 'multipart/form',
                },
                body: formData,
            });
            if(res.status === 200){
                navigate('/dashboard');
                alert('Job submitted');
            } else{
                
            }
        } catch(err){
            console.log(err);
        }
    }


    return (
        <div className='main'>
            <div className='sub-main-menu'>
                <div className='content-menu'>
                    <form onSubmit={handleSubmit(submitHandler)}/*action='/api/uploadYAML' method='POST' Content-type='multipart/form-data'*/>
                        <h1>RUN JOB</h1>
                        <div className='node-row'>
                            <h3>In order to successfully run a job, it will be needed a yaml file with the necessary information.</h3>
                            <div>
                                <h4>If you are not familiar with this format, we attach below the necessary documentation:</h4>
                                <p className='h4-node'>&gt; Link to<a className='a-test' href='https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/' target="_blank" rel="noreferrer">documentation</a></p>
                                <p className='h4-node'>&gt; Kubernetes YAML<a className='a-test' href='https://k8syaml.com/' target="_blank" rel="noreferrer">generator</a></p>
                                <p className='h4-node'>&gt; You can use<a className='a-test' href='https://docs.podman.io/' target="_blank" rel="noreferrer">Podman</a> which allows you to generate a yaml from a running container.</p>
                                <p className='h4-node'>&gt; There is also<a className='a-test' href='https://kompose.io/' target="_blank" rel="noreferrer">Kompose</a> which transforms a Docker-Compose file into a yaml file.</p>
                            </div>
                            <div>
                                <h3>Now that you have generated the yaml, please upload the file below:</h3>
                            </div>   
                        </div>
                        <input type='file' name='file2upload' accept='.yml, .yaml' {...register("file")} required/>                      
                        <div><br/><button className='button-job' type='submit'>Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RunJob;