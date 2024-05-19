import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsThread, selectThreadById } from '../redux/features/User';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => selectThreadById(state, id));
  const [formattedUser, setFormattedUser] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      await dispatch(getDetailsThread(id));
    };

    fetchDetails();
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      const div = document.createElement('div');
      div.innerHTML = user.body;
      const text = div.textContent || div.innerText || '';
      const formattedThread = {
        ...user,
        body: text,
      };
      setFormattedUser(formattedThread);
    }
  }, [user]);

  if (!formattedUser) {
    return <div className="text-center flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="xl:container xl:mx-auto min-h-screen flex justify-center p-3" id="dashboard">
      <div className="flex flex-col w-7/12 border border-black p-5 rounded-lg bg-slate-50 gap-2 min-h-screen" id="user">
        <div className="flex flex-col gap-2 ps-5 mb-3" id="kategori">
          <div className="flex gap-2 break-after-column">
            <div className="border border-black p-1 text-md rounded-md text-blue-500">
              #{formattedUser.category}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 ps-5">
          <div>
            <div className="flex flex-col gap-2" id="thread">
              <p className="font-semibold text-xl">{formattedUser.title}</p>
              <div>
                <p className="text-md">{formattedUser.body}</p>
                <p className="text-sm">{formattedUser.createdAt}</p>
              </div>
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
