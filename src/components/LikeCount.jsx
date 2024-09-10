import { useState } from 'react';
import { useEffect } from 'react';

const LikeCount = ({ id, bool }) => {
    const [likes, setLikes] = useState([])
    useEffect(() => {

        fetch(`https://api-phitbook.onrender.com/post/likes/?post_id=${id}`)
            .then(response => response.json())
            .then(data => setLikes(data))
    }, [id, bool]);

    return (
        <div>
            {likes.length}
        </div>
    );
};

export default LikeCount; 