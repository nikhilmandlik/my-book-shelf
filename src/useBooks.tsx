import { useContext, useEffect, useState } from "react";
import { Userinfo, userContext } from "./UserContextProvider";

function filterBookShelfFile(data) {
    const files = data.files;
    if (!files) {
        return [];
    }

    console.log('files', files);

    return files.find(file => {
        const nameMatch = file.name === process.env.MY_BOOK_SHELF_FILE_NAME;
        const mimeMatch = file.mimeType === 'application/json';
        return nameMatch && mimeMatch;
    });
}

async function deletefile(currentUserinfo: Userinfo, bookFile: any) {
    if (!bookFile) {
        return;
    }

    const value = await fetch(`https://www.googleapis.com/drive/v3/files/${bookFile.id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${currentUserinfo.access_token}`,
        },
    }).then(res => res.json());

    console.log('value', value);
}

async function createfile(currentUserinfo: Userinfo) {
    const metadata = {
        title: process.env.MY_BOOK_SHELF_FILE_NAME,
        name: process.env.MY_BOOK_SHELF_FILE_NAME,
        mimeType: 'application/json',
    };
    const fileContent = {
        books: []
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([JSON.stringify(fileContent)], {type: "application/json"}));
    const fileInfo = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${currentUserinfo.access_token}`,
            ContentType: 'multipart/form-data',
        },
        body: form,
    }).then(res => res.json());

    console.log('Successfully created file', fileInfo.name);
}

function useBooks() {
    const [books, setbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileId, setFileId] = useState(undefined);

    const { currentUserinfo }: { currentUserinfo: Userinfo } = useContext(userContext);

    useEffect(() => {
        (async function() {
            const bookFile = await fetch(`https://www.googleapis.com/drive/v3/files?alt=json&access_token=${currentUserinfo.access_token}`)
                .then(res => res.json())
                .then(filterBookShelfFile);
            // deletefile(currentUserinfo, bookFile);
            if (!bookFile) {
                console.error('no file found, creating file on google drive');
                await createfile(currentUserinfo);
                setFileId(undefined);
            } else {
                const booksData = await fetch(`https://www.googleapis.com/drive/v3/files/${bookFile.id}?alt=media`,
                {
                    headers: {
                        Authorization: `Bearer ${currentUserinfo.access_token}`,
                    }
                }
                ).then(res => res.json());
                console.log(booksData);
                setbooks(booksData.books);
                setFileId(bookFile.id);
            }
            setLoading(false);
        })();
    }, []);

    return { fileId, accessToken: currentUserinfo.access_token, books, loading, error };
}

export default useBooks;
