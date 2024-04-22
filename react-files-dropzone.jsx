import DropZone from "dropzone.jsx"

const DropZoneComponent = ({ onDeleteAll, cardLoadersMap, filesMap, uploadedFiles, setUploadedFiles, dropzone, configure }) => {
  return (
    <div className="flex flex-col">                        
        <div className="mt-6 flex-wrap">                        
            {uploadedFiles.length!==0 || dropzone.loading?
            <div className="flex flex-col w-full">                
                <div className="flex">
                    <p className="text-left text-base">{configure.localization.uploadedDocuments??"Загруженные документы:"}</p> 
                    <Dialog>
                        <DialogTrigger asChild className="ml-auto">
                            <Button variant="outline" className="hover:bg-red-500 hover:text-white mt-[-5px]">Удалить все</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{configure.localization.confirmationOfFileDeletion??"Вы точно хотите удалить все документы?"}</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                {configure.localization.confirmationOfFileDeletion_description??"Документы будут удалены без возвратно."}
                            </DialogDescription>
                            <DialogFooter className="sm:justify-start">
                                <DialogTrigger asChild>
                                    <Button type="button" variant="secondary">
                                        {configure.localization.cancel??"Отмена"}
                                    </Button>
                                </DialogTrigger>
                                <Button onClick={onDeleteAll} type="button" variant="destructive">
                                    {configure.localization.delete??"Удалить"}
                                </Button>
                            </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </div>
                <div className="mt-4 flex flex-wrap w-full max-h-[200px] overflow-auto" style={selectedFiles.length === 0?undefined:{maxHeight: "100px"}}>
                    {
                        uploadedFiles.map(filesMap)   
                    }
                    {
                        dropzone.loading?
                            dropzone.selectedFiles.map(cardLoadersMap)   
                        :
                        <></>
                    }
                </div>
            </div>
                :
            configure.localization.hintWithoutUploadedFiles??"Перетащите или выбирите документы которые хотите добавить, чтобы нейронная сеть опираясь на них выдала Вам нужную информацию."
            }
        </div>
        <DropZone 
                className={undefined}
                filesMap={dropzone.filesMap} 
                filesUnloadedMap={dropzone.filesUnloadedMap}} 
                loading={dropzone.loading}
                files={dropzone.selectedFiles}
                handleChange={file=>{
                    dropzone.setSelectedFiles(currentFiles=>
                        [file, ...currentFiles]
                    )
                }}
                handleDrop={file=>{
                    dropzone.setSelectedFiles(currentFiles=>
                        [file, ...currentFiles]
                    )
                }}
        />
    </div>
  )
}