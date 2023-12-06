import {  makeAutoObservable } from 'mobx'
import { Activity } from '../app/models/activity';
import agent from '../app/api/agent';

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | null | undefined = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true)
        try {
           const activities = await agent.Activities.list();
            activities.forEach(activity =>{
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
           this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id:string) => {
        this.selectedActivity = this.activities.find((a => a.id === id))
    }

    cancleSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancleSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
}