import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Pencil, Search, Trash2 } from 'lucide-react';

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching journals:', error);
      } else {
        setJournals(data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { error } = await supabase
        .from('journals')
        .insert([
          {
            user_id: session.user.id,
            title,
            description,
          },
        ]);

      if (error) {
        console.error('Error creating journal:', error);
      } else {
        setTitle('');
        setDescription('');
        setShowForm(false);
        fetchJournals();
      }
    }
  };

  const deleteJournal = async (journalId) => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      setIsDeleting(true);
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('id', journalId);

      if (error) {
        console.error('Error deleting journal:', error);
      } else {
        fetchJournals();
      }
      setIsDeleting(false);
    }
  };

  const filteredJournals = journals.filter(journal => 
    journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Journals</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
          >
            <Plus size={20} />
            New Journal
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search journals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              required
            />
            <textarea
              placeholder="Write your thoughts..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md h-40"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Journal
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {filteredJournals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No journals match your search" : "No journals yet"}
            </div>
          ) : (
            filteredJournals.map((journal) => (
              <div key={journal.id} className="bg-white p-6 rounded-lg shadow-md relative group">
                <button
                  onClick={() => deleteJournal(journal.id)}
                  disabled={isDeleting}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-2">{journal.title}</h2>
                <p className="text-gray-600 mb-4 whitespace-pre-wrap">{journal.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(journal.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journals;