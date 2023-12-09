import {  makeAutoObservable, runInAction } from 'mobx'
import { Activity } from '../app/models/activity';
import agent from '../app/api/agent';
import uuid from 'react-uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | null | undefined = null;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activityByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        try {
           const activities = await agent.Activities.list();
            activities.forEach(activity =>{
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity)           
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
        this.selectedActivity = this.activityRegistry.get(id);
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

    creatActivity = async (activity:Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityRegistry = this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id === id) this.cancleSelectedActivity(); 
                this.loading = false
            })
        } catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
}